import './App.css';

import React from 'react';
import { WhiteWebSdk, RoomWhiteboard } from "white-react-sdk";

class App extends React.Component {

    static sdkToken = "111";
    static whiteWebSdk = new WhiteWebSdk({
        appIdentifier: "111",
    });

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        var self = this;
        var roomUUID = "";

        this.createRoom().then(function(roomJSON) {
            // 房间创建成功，获取描述房间内容的 roomJSON
            roomUUID = roomJSON.uuid;
            return self.createRoomToken(roomUUID);

        }).then(function (roomToken) {
            // 房间的 roomToken 已签出
            return App.whiteWebSdk.joinRoom({
                uuid: roomUUID,
                roomToken: roomToken,
                uid: "my-uid",
            });
        }).then(function(room) {
            self.setState({room: room});

        }).catch(function(err) {
            // 创建房间失败
            console.error(err);
        });
    }

    createRoom() {
        var url = "https://api.netless.link/v5/rooms";
        var requestInit = {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "token": App.sdkToken,
                "region": "cn-hz",
            },
        };
        return window.fetch(url, requestInit).then(function(response) {
            return response.json();
        });
    }

    createRoomToken(roomUUID) {
        var url = "https://api.netless.link/v5/tokens/rooms/" + roomUUID;
        var requestInit = {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "token": App.sdkToken,
            },
            body: JSON.stringify({
                "lifespan": 0, // 表明 Room Token 永不失效
                "role": "admin", // 表明 Room Token 有 Admin 的权限
            }),
        };
        return window.fetch(url, requestInit).then(function(response) {
            return response.json();
        });
    }

    render() {
        var whiteboardView = null;

        // 创建并加入房间是一个异步操作。
        // 如果 this.state.room 还没准备好，则不显示白板。
        if (this.state.room) {
            whiteboardView = (
                <RoomWhiteboard room={this.state.room}
                                style={{
                                    width: "100%",
                                    height: "100vh",
                                }}/>
            );
        }
        return (
            <div className="App">
                {whiteboardView}
            </div>
        );
    }
}

export default App;
