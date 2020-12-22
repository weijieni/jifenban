import { UI } from '@hyext/hy-ui'
import React, { Component } from 'react'
import './app.hycss'
const hyExt = global.hyExt;


const { View, Text, Button, Input} = UI

class App extends Component {

  constructor () {
    super()

    this.state = {
      wb: false, // 代码是否处于独立白板模式
      wbData: '', // 发送到独立白板的数据，驱动独立白板进行视图更新
      wbMsg: '', // 独立白板接收到的数据，用来更新独立白板视图
      wbId: '', // 独立白板id
      clubNameOne: '',
      clubNameTwo: '',
      clubMarkOne: '',
      clubMarkTwo: '',
      playerNameOne: '',
      playerNameTwo: '',
      playerMarkOne: '',
      playerMarkTwo: '',
      boardData: [
        {id: 'clubNameOne', data: ''},
        {id: 'clubNameTwo', data: ''},
        {id: 'clubMarkOne', data: ''},
        {id: 'clubMarkTwo', data: ''},
        {id: 'playerNameOne', data: ''},
        {id: 'playerNameTwo', data: ''},
        {id: 'playerMarkOne', data: ''},
        {id: 'playerMarkTwo', data: ''},
      ]
}

    // 调用sdk获取初始化参数的api，判断是否处于独立白板模式
    if (typeof hyExt.env.getInitialParam === 'function') {
      hyExt.env.getInitialParam().then(param => {
        if (param.wb) {
          // 初始化参数包含wb参数，说明处于独立白板模式
          this.setState({
            wb: true
          })
          // 监听从原来小程序发送过来的独立白板数据
          hyExt.stream.onExtraWhiteBoardMessage({
            // 接收到数据，刷新视图
            callback: (data) => {this.setState({ 
              board: data
            })}
          })
        }
      })
    }
  }

  emitMessage(msg){
    console.log("[message]");
    hyExt.observer.emit('message-push',msg).then((res)=>{
      console.log("向客户端小程序广播信息成功！")}
    ).catch((err)=>{
      console.log(err);
    });
  }

  sendClubNameOne () {
    
    let { clubNameOne, wbId } = this.state
    this.emitMessage(clubNameOne);
    // 发送数据到独立白板
    if(this.state.wbId){
      hyExt.stream.sendToExtraWhiteBoard({
        wbId,
        data: clubNameOne,
      })
      console.log("发送到独立白板成功");
    }
  }

  sendClubNameTwo () {
    let { clubNameTwo, wbId } = this.state
    this.emitMessage(clubNameTwo);
    // 发送数据到独立白板
    if(this.state.wbId){
      hyExt.stream.sendToExtraWhiteBoard({
        wbId,
        data2: clubNameTwo
      })
      console.log("发送到独立白板成功");
    }
  }

  createWb () {
    let width = Number(this.state.width) || 1100
    let height = Number(this.state.height) || 150

    // 创建独立白板
    hyExt.stream.addExtraWhiteBoard({
      width, height
    }).then(({ wbId }) => {
      // 返回独立白板id，发送数据的时候需要带上这个参数
      this.state.wbId = wbId
    }).catch((err)=>{
      console.log(err)
    })
  }

  // renderWb () {
  //   console.log(4);
  //   return (
  //     <View>
  //       <View className='wb'>
  //         <Text className='data'>{this.state.wbMsg || ''}</Text>
  //       </View>
  //     </View>
  //   )
  // }
  
  renderForm () {
    return (
      
      <View className='container'>
        <table className='board'>
          <tr>
            <td className="texts">俱乐部一：<text>{this.state.clubNameOne || ''}</text></td>
            <td colSpan={5} className="texts">俱乐部得分：</td>
            <td rowSpan={3} className="logo"><img src={require('../img/logo.png')} alt="" style = {{width: 46, height: 56, padding: 0}}/> </td>
            <td colSpan={5} className="texts">俱乐部得分：</td>
            <td className="texts">俱乐部二：<text>{this.state.clubNameTwo || ''}</text></td>
          </tr>
          <tr>
            <td className="texts">选手个人得分：</td>
            <td className="texts"><img src={require('../img/silver.png')} alt="" style = {{width: 15, height: 15, padding: 0}}></img></td>
            <td className="texts"><img src={require('../img/silver.png')} alt="" style = {{width: 15, height: 15, padding: 0}}></img></td>
            <td className="texts"><img src={require('../img/silver.png')} alt="" style = {{width: 15, height: 15, padding: 0}}></img></td>
            <td className="texts"><img src={require('../img/silver.png')} alt="" style = {{width: 15, height: 15, padding: 0}}></img></td>
            <td className="texts"><img src={require('../img/gold.png')} alt=""   style = {{width: 15, height: 15, padding: 0}}></img></td>
            <td className="texts"><img src={require('../img/gold.png')} alt=""   style = {{width: 15, height: 15, padding: 0}}></img></td>
            <td className="texts"><img src={require('../img/silver.png')} alt="" style = {{width: 15, height: 15, padding: 0}}></img></td>
            <td className="texts"><img src={require('../img/silver.png')} alt="" style = {{width: 15, height: 15, padding: 0}}></img></td>
            <td className="texts"><img src={require('../img/silver.png')} alt="" style = {{width: 15, height: 15, padding: 0}}></img></td>
            <td className="texts"><img src={require('../img/silver.png')} alt="" style = {{width: 15, height: 15, padding: 0}}></img></td>
            <td className="texts">选手个人得分：</td>
          </tr>
          <tr>
            <td className="texts">选手：</td>
            <td className="texts"></td>
            <td className="texts"></td>
            <td className="texts"></td>
            <td className="texts"></td>
            <td className="texts"></td>
            <td className="texts"></td>
            <td className="texts"></td>
            <td className="texts"></td>
            <td className="texts"></td>
            <td className="texts"></td>
            <td className="texts">选手：</td>
          </tr>
        </table>
        <View className="data">
          <Text>
            {this.state.wbMsg || ''}
          </Text>
        <View className='section'>
          <Button className='button' onPress={() => this.createWb()}>创建记分板</Button>
        </View>
        </View>
          <Text className='label'>俱乐部一名称</Text>
          <View className='section'>
            <Input className='input' blurOnSubmit={false} placeholder='输入' value={this.state.clubNameOne} onChange={v => this.setState({ clubNameOne: v })} />
            <Button className='button' onPress={() => this.sendClubNameOne()}><text style = {{fontSize: 12}}>发送数据</text></Button>
          </View>
          <Text className='label'>俱乐部二名称</Text>
          <View className='section'>
            <Input className='input' blurOnSubmit={false} placeholder='输入' value={this.state.clubNameTwo} onChange={r => this.setState({ clubNameTwo: r })} />
            <Button className='button' onPress={() => this.sendClubNameTwo()}><text style = {{fontSize: 12}}>发送数据</text></Button>
          </View>
         

      </View>
    )
  }  
  
  render () {
    console.log(this.state);
    if (this.state.wb) {
      return this.renderForm()
    } else {
      return this.renderForm()
    }
  }
}

export default App
