import React, { Component } from 'react';
import { Drawer } from 'antd';
import CRUDActions from '../../entityActions/';
import { capitalize } from 'lodash';

class DrawerComponent extends Component {
    render() {
        let FirstComponent;
        if (this.props.type === 'entityAction') {
            FirstComponent = this.props.drawerInfo && CRUDActions[this.props.drawerInfo.type + capitalize(this.props.drawerInfo.action)];
            //  SecondComponent = this.props.drawerInfo[1] && CRUDActions[this.props.drawerInfo[1].type + capitalize(this.props.drawerInfo[1].action)];
        }
        else {
            FirstComponent = this.props.drawerInfo && this.props.drawerInfo.component;
            //  SecondComponent = this.props.drawerInfo[1] && this.props.drawerInfo[1].component;
        }
        return (
            <div>
                <Drawer
                    title={this.props.drawerInfo.title ? this.props.drawerInfo.title : ''}
                    placement="right"
                    closable={true}
                    className={this.props.drawerInfo ? this.props.drawerInfo.className : ''}
                    width={490}
                    onClose={() => { this.props.closeDrawer() }}
                    visible={!!this.props.drawerInfo.action}
                >
                    {FirstComponent && <FirstComponent />}
                    {/*<Drawer*/}
                    {/*title={this.props.drawerInfo[1] ? this.props.drawerInfo[1].title : ''}*/}
                    {/*placement="right"*/}
                    {/*closable={true}*/}
                    {/*width={420}*/}
                    {/*onClose={() => { this.props.closeDrawer() }}*/}
                    {/*visible={this.props.drawerInfo[1] ? true : false}*/}
                    {/*>*/}
                    {/*{SecondComponent && <SecondComponent />}*/}
                    {/*</Drawer>*/}
                </Drawer>
            </div>
        )
    }
}



export default DrawerComponent
