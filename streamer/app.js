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
      board:[]
    }

    this.setState({
      board: [
        this.state.clubNameOne, 
        this.state.clubNameTwo, 
        this.state.clubMarkOne,  
        this.state.clubMarkTwo, 
        this.state.playerNameOne, 
        this.state.playerNameTwo,
        this.state.playerMarkOne, 
        this.state.playerMarkTwo
      ]
    })

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
            callback: data => {this.setState({ 
              board: JSON.parse(data)
            })}
          })
        }
      })
    }
  }

   
  emitMessage(msg){
    console.log(msg);
    hyExt.observer.emit('message-push',msg).then((res)=>{
      console.log("向客户端小程序广播信息成功！")}
    ).catch((err)=>{
      console.log(err);
    });
  }

  sendData () {
    
    let { wbId, board } = this.state
    this.setState({
      board: [
        this.state.clubNameOne, 
        this.state.clubNameTwo, 
        this.state.clubMarkOne,  
        this.state.clubMarkTwo,
        this.state.playerNameOne, 
        this.state.playerNameTwo,
        this.state.playerMarkOne, 
        this.state.playerMarkTwo
      ]
    })
    this.emitMessage(board)
    // 发送数据到独立白板
    if(this.state.wbId){
      hyExt.stream.sendToExtraWhiteBoard({
        wbId,
        data: JSON.stringify(board),
        // data: board
      }).catch(
        (err)=>{console.log(err)}
      )
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

  removeWb () {
    hyExt.stream.removeExtraWhiteBoard(this.state.wbId).then(() => {
      this.setState({
        wbId:''
      })
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
          <tr className = 'row'>
            <td className="titles"><text className = 'texts'>俱乐部一：{this.state.board[0] || ''}</text></td>
            <td colSpan={5} className="units"><text className = 'texts'>俱乐部得分:{this.state.board[2] || ''}</text></td>
            <td rowSpan={3} className="logo"><img className = 'img' src={require('../img/logo.jpg')} alt="" /> </td>
            <td colSpan={5} className="units"><text className = 'texts'>俱乐部得分:{this.state.board[3] || ''}</text></td>
            <td className="titles"><text className = 'texts'>俱乐部二: {this.state.board[1] || ''}</text></td>
          </tr>
          <tr className = 'row'>
            <td className="units"><text className = 'texts'>选手得分：{this.state.board[6] || ''}</text></td>
            <td className="units"><img className = 'img'src={require('../img/silver.png')} alt="" ></img></td>
            <td className="units"><img className = 'img'src={require('../img/silver.png')} alt="" ></img></td>
            <td className="units"><img className = 'img'src={require('../img/silver.png')} alt="" ></img></td>
            <td className="units"><img className = 'img'src={require('../img/silver.png')} alt="" ></img></td>
            <td className="units"><img className = 'img'src={require('../img/gold.png')} alt=""   ></img></td>
            <td className="units"><img className = 'img'src={require('../img/gold.png')} alt=""   ></img></td>
            <td className="units"><img className = 'img'src={require('../img/silver.png')} alt="" ></img></td>
            <td className="units"><img className = 'img'src={require('../img/silver.png')} alt="" ></img></td>
            <td className="units"><img className = 'img'src={require('../img/silver.png')} alt="" ></img></td>
            <td className="units"><img className = 'img'src={require('../img/silver.png')} alt="" ></img></td>
            <td className="units"><text className = 'texts'>选手得分：{this.state.board[7] || ''}</text></td>
          </tr>
          <tr className = 'row'>
            <td className="units"><text className = 'texts'>选手：{this.state.board[4] || ''}</text></td>
            <td className="units"></td>
            <td className="units"></td>
            <td className="units"></td>
            <td className="units"></td>
            <td className="units"></td>
            <td className="units"></td>
            <td className="units"></td>
            <td className="units"></td>
            <td className="units"></td>
            <td className="units"></td>
            <td className="units"><text className = 'texts'>选手：{this.state.board[5] || ''}</text></td>
          </tr>
        </table>

        <Button className='button' onPress={() => this.createWb()}><text style = {{fontSize: 12}}>创建记分板</text></Button>
        {/* <Button className='button' onPress={() => this.removeWb()}>删除记分板</Button> */}
       
        <View className='section'>
          <View className = 'group'>
            <Text className='label'>俱乐部一名称</Text>
            <Input className='input' blurOnSubmit={false} placeholder='输入' value={this.state.clubNameOne} onChange={v => this.setState({ clubNameOne: v })} />
          </View>
          <View className = 'group'>
            <Text className='label'>俱乐部二名称</Text>
            <Input className='input' blurOnSubmit={false} placeholder='输入' value={this.state.clubNameTwo} onChange={v => this.setState({ clubNameTwo: v })} />
          </View>
          <View className = 'group'>
            <Text className='label'>俱乐部一分数</Text>
            <Input className='input' blurOnSubmit={false} placeholder='输入' value={this.state.clubMarkOne} onChange={r => this.setState({ clubMarkOne: r })} />
          </View>
          <View className = 'group'>
            <Text className='label'>俱乐部二分数</Text>
            <Input className='input' blurOnSubmit={false} placeholder='输入' value={this.state.clubMarkTwo} onChange={r => this.setState({ clubMarkTwo: r })} />
          </View>
          <View className = 'group'>
            <Text className='label'>选手一名称</Text>
            <Input className='input' blurOnSubmit={false} placeholder='输入' value={this.state.playerNameOne} onChange={r => this.setState({ playerNameOne: r })} />
          </View>
          <View className = 'group'>  
            <Text className='label'>选手二名称</Text>
            <Input className='input' blurOnSubmit={false} placeholder='输入' value={this.state.playerNameTwo} onChange={r => this.setState({ playerNameTwo: r })} />
          </View>
          <View className = 'group'>  
            <Text className='label'>选手一分数</Text>
            <Input className='input' blurOnSubmit={false} placeholder='输入' value={this.state.playerMarkOne} onChange={r => this.setState({ playerMarkOne: r })} />
          </View>
          <View className = 'group'>  
            <Text className='label'>选手二分数</Text>
            <Input className='input' blurOnSubmit={false} placeholder='输入' value={this.state.playerMarkTwo} onChange={r => this.setState({ playerMarkTwo: r })} />
          </View>
         </View>

         
          <Button className='button' onPress={() => this.sendData()}><text style = {{fontSize: 12}}>发送数据</text></Button>
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
