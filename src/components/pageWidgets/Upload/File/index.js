import React from 'react';
import styles from './style.module.css';


export default ({
    onChange = () => {},
    accept = '.jpg,.png,.jpeg',
    multiple = false,
    children
}) => (
    <React.Fragment>
        <input
            id='fileinput'
            className={styles.input}
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={async (e) => {
                if (!e.target.files.length) {
                    return;
                }
                const files = e.target.files;
                onChange(multiple?files:files[0]);
            }}
        />
        <label className={styles.label} htmlFor='fileinput'>
            {children}
        </label>
    </React.Fragment>
)