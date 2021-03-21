/* eslint-disable */

import { Editor } from 'slate-react'
import { Value, Block } from 'slate'
import Html from 'slate-html-serializer'
// import imageExtensions from 'image-extensions'

import React from 'react'
import initialValue from './value.json'
import { isKeyHotkey } from 'is-hotkey'
import { Button } from 'antd'
import styles from './style.module.css'
import formatBold from '../../../assets/icons/RichTextEditor/Bold.svg';
import imageIcon from '../../../assets/icons/RichTextEditor/image.svg';
import headingOne from '../../../assets/icons/RichTextEditor/H1.svg';
import headingTwo from '../../../assets/icons/RichTextEditor/H2.svg';
import quote from '../../../assets/icons/RichTextEditor/quote.svg';
import italic from '../../../assets/icons/RichTextEditor/I.svg';
import underline from '../../../assets/icons/RichTextEditor/underline.svg';
import ul from '../../../assets/icons/RichTextEditor/unordered-list.svg';
import ol from '../../../assets/icons/RichTextEditor/ordered-list.svg';
import ImageModalContent from './ImageModalContent';
import Modal from '../../common/modal';
import QuoteModalContent from './ModalContent';
/**
 * A change function to standardize inserting images.
 *
 * @param {Editor} editor;
 * @param {String} src
 * @param {Range} target
 */

function insertImage(editor, src, target) {
    if (target) {
        editor.select(target)
    }

    editor.insertBlock({
        type: 'image',
        data: {
            src: src.fileUrl,
            text: src.caption
        }
    })
}

function insertQuote(editor, src, target) {
    if (target) {
        editor.select(target)
    }
    
    editor.insertBlock({
        type: 'block-quote',
        data: {
            quote: src.quote,
            author: src.author
        }
    })
}

/**
 * A function to determine whether a URL has an image extension.
 *
 * @param {String} url
 * @return {Boolean}
 */

// function isImage(url) {
//     return imageExtensions.includes(getExtension(url))
// }

const schema = {
    document: {
        last: { type: 'paragraph' },
        normalize: (editor, { code, node, child }) => {
            switch (code) {
                case 'last_child_type_invalid': {
                    const paragraph = Block.create('paragraph')
                    return editor.insertNodeByKey(node.key, node.nodes.size, paragraph)
                }
            }
        },
    },
    blocks: {
        image: {
            isVoid: true,
        },
        'block-quote': {
            isVoid: true,
        },
    },
}

/**
   * Get the extension of the URL, using the URL API.
   *
   * @param {String} url
   * @return {String}
   */

// function getExtension(url) {
//     return new URL(url).pathname.split('.').pop()
// }

/**
 * Define the default node type.
 *
 * @type {String}
 */

const BLOCK_TAGS = {
    blockquote: 'block-quote',
    p: 'paragraph',
    h1: 'heading-one',
    h2: 'heading-two',
    ol: 'numbered-list',
    ul: 'bulleted-list',
    li: 'list-item',
    img: 'image',
    span: 'span'
}

const MARK_TAGS = {
    em: 'italic',
    strong: 'bold',
    u: 'underlined',
}

const DEFAULT_NODE = 'paragraph'
const rules = [
    {
        deserialize(el, next) {
            const type = BLOCK_TAGS[el.tagName.toLowerCase()]
            if (type) {
                const data = {
                    className: el.getAttribute('class'),
                }
                if (type === 'image') {
                    data.src = el.getAttribute('src');
                }
                return {
                    object: 'block',
                    type: type,
                    data,
                    nodes: next(el.childNodes),
                }
            }
        }
    },
    {
        deserialize(el, next) {
            const type = MARK_TAGS[el.tagName.toLowerCase()]
            if (type) {
                return {
                    object: 'mark',
                    type: type,
                    nodes: next(el.childNodes),
                }
            }
        },
    },
    {
        serialize(obj, children) {
            if (obj.object === 'block') {
                switch (obj.type) {
                    case 'paragraph':
                        return <p className={obj.data.get('className')}>{children}</p>
                    case 'heading-one':
                        return <h1 className={obj.data.get('className')}>{children}</h1>
                    case 'heading-two':
                        return <h2 className={obj.data.get('className')}>{children}</h2>
                    case 'numbered-list':
                        return <ol className={obj.data.get('className')}>{children}</ol>
                    case 'bulleted-list':
                        return <ul className={obj.data.get('className')}>{children}</ul>
                    case 'list-item':
                        return <li className={obj.data.get('className')}>{children}</li>
                    case 'block-quote':
                        return <blockquote><span>{obj.data.get('quote')}</span><p>{obj.data.get('author')}</p></blockquote>
                    case 'image':
                        return <img src={obj.data.get('src')} />
                        case 'span':
                            return <span>{children}</span>
                    default:
                        break;
                }
            }
        }
    },
    {
        serialize(obj, children) {
            if (obj.object === 'mark') {
                switch (obj.type) {
                    case 'bold':
                        return <strong className={obj.data.get('className')}>{children}</strong>
                    case 'italic':
                        return <i className={obj.data.get('className')}>{children}</i>
                    case 'underlined':
                        return <u className={obj.data.get('className')}>{children}</u>
                    default:
                        break;
                }
            }
        }
    },
]

const serializer = new Html({
    rules
})

/**
 * Define hotkey matchers.
 *
 * @type {Function}
 */

const isBoldHotkey = isKeyHotkey('mod+b')
const isItalicHotkey = isKeyHotkey('mod+i')
const isUnderlinedHotkey = isKeyHotkey('mod+u')
const isCodeHotkey = isKeyHotkey('mod+`')

/**
 * The rich text example.
 *
 * @type {Component}
 */

class RichTextExample extends React.Component {
    /**
     * Deserialize the initial editor value.
     *
     * @type {Object}
     */

    state = {
        value: serializer.deserialize(this.props.value || '<p></p>'),
        openImageModal: false,
        openQuoteModal: false,
    }

    

    componentDidUpdate(prevProps) {
        if (prevProps.value !== this.props.value) {
        

            this.setState({
                value: serializer.deserialize(this.props.value)
            })
        }
    }

    static defaultProps = {
        onChange: () => { },
    }

    /**
     * Check if the current selection has a mark with `type` in it.
     *
     * @param {String} type
     * @return {Boolean}
     */

    hasMark = type => {
        const { value } = this.state;
        return value.activeMarks.some(mark => mark.type === type)
    }

    /**
     * Check if the any of the currently selected blocks are of `type`.
     *
     * @param {String} type
     * @return {Boolean}
     */

    hasBlock = type => {
        const { value } = this.state
        return value.blocks.some(node => node.type === type)
    }

    /**
     * Store a reference to the `editor`.
     *
     * @param {Editor} editor
     */

    ref = editor => {
        this.editor = editor
    }

    /**
     * Render.
     *
     * @return {Element}
     */

    render() {
        return (
            <div>
                <label className={styles.inputLabel} hidden={!this.props.label}>{this.props.label}</label>
                <div className={styles.editorContainer}>
                    <div className={styles.toolbar}>
                        {this.renderBlockButton('heading-one', headingOne)}
                        {this.renderBlockButton('heading-two', headingTwo)}
                        {this.renderMarkButton('bold', formatBold)}
                        {this.renderMarkButton('italic', italic)}
                        {this.renderMarkButton('underlined', underline)}
                        {this.renderQuoteButton('block-quote', quote)}
                        {this.renderBlockButton('numbered-list', ol)}
                        {this.renderBlockButton('bulleted-list', ul)}
                        {this.renderImageButton('image', imageIcon)}
                    </div>
                    <div style={{ overflow: 'scroll', height: '100%' }}><Editor
                        spellCheck
                        autoFocus
                        className={styles.editorBody}
                        placeholder="Enter some rich text..."
                        ref={this.ref}
                        schema={schema}
                        value={this.state.value}
                        onChange={this.onChange}
                        onKeyDown={this.onKeyDown}
                        renderNode={this.renderNode}
                        renderMark={this.renderMark}
                    /></div>
                    <Modal
                        visible={this.state.openImageModal}
                        title={'Submit an Image'}
                    >
                        <ImageModalContent
                            onSubmit={this.onImageSubmit}
                            onCancel={this.onModalClose}
                        />
                    </Modal>
                    <Modal
                        visible={this.state.openQuoteModal}
                        title={'Enter a quote'}
                    >
                        <QuoteModalContent
                            onSubmit={this.onQuoteSubmit}
                            onCancel={this.onModalClose}
                        />
                    </Modal>
                </div>
            </div>
        )
    }

    onModalClose = () => {
        this.setState({
            ...this.state,
            openImageModal: false,
            openQuoteModal: false,
        })
    }

    /**
     * Render a mark-toggling toolbar button. 
     *
     * @param {String} type
     * @param {String} icon
     * @return {Element}
     */

    renderMarkButton = (type, icon) => {
        const isActive = this.hasMark(type)
        return (
            <Button
                className={isActive ? styles.active : ''}
                active={isActive ? true + '' : undefined}
                onMouseDown={event => this.onClickMark(event, type)}
            >
                <img src={icon} alt="" />
            </Button>
        )
    }

    renderImageButton = (type, icon) => {
        let isActive = this.hasBlock(type)

        if (['numbered-list', 'bulleted-list'].includes(type)) {
            const { value: { document, blocks } } = this.state

            if (blocks.size > 0) {
                const parent = document.getParent(blocks.first().key)
                isActive = this.hasBlock('list-item') && parent && parent.type === type
            }
        }
        return (
            <Button
                className={isActive ? styles.active : ''}
                active={isActive ? true + '' : undefined}
                onMouseDown={event => this.onClickImage(event)}
            >
                <img src={icon} alt="" />
            </Button>
        )
    }

    renderQuoteButton = (type, icon) => {
        let isActive = this.hasBlock(type)

        if (['numbered-list', 'bulleted-list'].includes(type)) {
            const { value: { document, blocks } } = this.state

            if (blocks.size > 0) {
                const parent = document.getParent(blocks.first().key)
                isActive = this.hasBlock('list-item') && parent && parent.type === type
            }
        }
        return (
            <Button
                className={isActive ? styles.active : ''}
                active={isActive ? true + '' : undefined}
                onMouseDown={event => this.onClickQuote(event)}
            >
                <img src={icon} alt="" />
            </Button>
        )
    }

    /**
     * Render a block-toggling toolbar button.
     *
     * @param {String} type
     * @param {String} icon
     * @return {Element}
     */

    renderBlockButton = (type, icon) => {
        let isActive = this.hasBlock(type)

        if (['numbered-list', 'bulleted-list'].includes(type)) {
            const { value: { document, blocks } } = this.state

            if (blocks.size > 0) {
                const parent = document.getParent(blocks.first().key)
                isActive = this.hasBlock('list-item') && parent && parent.type === type
            }
        }
        return (
            <Button
                className={isActive ? styles.active : ''}
                active={isActive ? true + '' : undefined}
                onMouseDown={event => this.onClickBlock(event, type)}
            >
                <img src={icon} alt="" />
            </Button>
        )
    }

    onClickImage = event => {
        this.setState({
            ...this.state,
            openImageModal: true
        })
    }

    onClickQuote = event => {
        this.setState({
            ...this.state,
            openQuoteModal: true
        })
    }

    onImageSubmit = src => {
        this.setState({
            ...this.state,
            openImageModal: false,
        }, () => {
            this.editor.command(insertImage, src);
        })
    }

    onQuoteSubmit = src => {
        this.setState({
            ...this.state,
            openQuoteModal: false,
        }, () => {
            this.editor.command(insertQuote, src);
        })
    }

    /**
     * Render a Slate node.
     *
     * @param {Object} props
     * @return {Element}
     */

    renderNode = (props, editor, next) => {
        const { attributes, children, node, isFocused } = props

        switch (node.type) {    
            case 'image':
                return <img src={node.data.get('src')} />
            case 'block-quote':
                return <blockquote><span>{node.data.get('quote')}</span><p>{node.data.get('author')}</p></blockquote>
            case 'bulleted-list':
                return <ul {...attributes}>{children}</ul>
            case 'heading-one':
                return <h1 {...attributes}>{children}</h1>
            case 'heading-two':
                return <h2 {...attributes}>{children}</h2>
            case 'list-item':
                return <li {...attributes}>{children}</li>
            case 'numbered-list':
                return <ol {...attributes}>{children}</ol>
                case 'span':
                    return <span>{children}</span>
            default:
                return next()
        }
    }

    /**
     * Render a Slate mark.
     *
     * @param {Object} props
     * @return {Element}
     */

    renderMark = (props, editor, next) => {
        const { children, mark, attributes } = props

        switch (mark.type) {
            case 'bold':
                return <strong {...attributes}>{children}</strong>
            case 'code':
                return <code {...attributes}>{children}</code>
            case 'italic':
                return <em {...attributes}>{children}</em>
            case 'underlined':
                return <u {...attributes}>{children}</u>
            default:
                return next()
        }
    }

    /**
     * On change, save the new `value`.
     *
     * @param {Editor} editor
     */

    onChange = ({ value }) => {
        const r = serializer.serialize(value)
        this.props.onChange(r);
        this.setState({ value });
    }

    /**
     * On key down, if it's a formatting command toggle a mark.
     *
     * @param {Event} event
     * @param {Editor} editor
     * @return {Change}
     */

    onKeyDown = (event, editor, next) => {
        let mark

        if (isBoldHotkey(event)) {
            mark = 'bold'
        } else if (isItalicHotkey(event)) {
            mark = 'italic'
        } else if (isUnderlinedHotkey(event)) {
            mark = 'underlined'
        } else if (isCodeHotkey(event)) {
            mark = 'code'
        } else {
            return next()
        }

        event.preventDefault()
        editor.toggleMark(mark)
    }

    /**
     * When a mark button is clicked, toggle the current mark.
     *
     * @param {Event} event
     * @param {String} type
     */

    onClickMark = (event, type) => {
        event.preventDefault()
        this.editor.toggleMark(type)
    }

    /**
     * When a block button is clicked, toggle the block type.
     *
     * @param {Event} event
     * @param {String} type
     */

    onClickBlock = (event, type) => {
        event.preventDefault()
        const { editor } = this
        const { value } = editor
        const { document } = value

        // Handle everything but list buttons.
        if (type !== 'bulleted-list' && type !== 'numbered-list') {
            const isActive = this.hasBlock(type)
            const isList = this.hasBlock('list-item')

            if (isList) {
                editor
                    .setBlocks(isActive ? DEFAULT_NODE : type)
                    .unwrapBlock('bulleted-list')
                    .unwrapBlock('numbered-list')
            } else {
                editor.setBlocks(isActive ? DEFAULT_NODE : type)
            }
        } else {
            // Handle the extra wrapping required for list buttons.
            const isList = this.hasBlock('list-item')
            const isType = value.blocks.some(block => {
                return !!document.getClosest(block.key, parent => parent.type === type)
            })

            if (isList && isType) {
                editor
                    .setBlocks(DEFAULT_NODE)
                    .unwrapBlock('bulleted-list')
                    .unwrapBlock('numbered-list')
            } else if (isList) {
                editor
                    .unwrapBlock(
                        type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
                    )
                    .wrapBlock(type)
            } else {
                editor.setBlocks('list-item').wrapBlock(type)
            }
        }
    }
}

/**
 * Export.
 */

export default RichTextExample
