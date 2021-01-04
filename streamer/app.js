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
      firSilverOne: '',
      secSilverOne: '',
      thdSliverOne: '',
      fthSliverOne: '',
      goldOne: '',
      goldTwo: '',
      fthSliverTwo: '',
      thdSliverTwo: '',
      secSilverTwo: '',
      firSilverTwo: '',
      selectedBtn1: '未打',
      selectedBtn2: '未打',
      selectedBtn3: '未打',
      selectedBtn4: '未打',
      selectedBtn5: '未打',
      selectedBtn6: '未打',
      selectedBtn7: '未打',
      selectedBtn8: '未打',
      selectedBtn9: '未打',
      selectedBtnx: '未打',
      board:[
        '', //俱乐部一名称
        '', //俱乐部二名称
        '', //俱乐部一得分
        '', //俱乐部二得分
        '', //选手一名称
        '', //选手二名称
        '', //选手一得分
        '', //选手二得分
        '', //选手一 银球一
        '', //选手一 银球二
        '', //选手一 银球三
        '', //选手一 银球四
        '', //选手一 金球
        '', //选手二 金球
        '', //选手二 银球四
        '', //选手二 银球三
        '', //选手二 银球二
        '', //选手二 银球一
        '未打', // 选手一 银球一 选择情况
        '未打', // 选手一 银球二 选择情况
        '未打', // 选手一 银球三 选择情况
        '未打', // 选手一 银球四 选择情况
        '未打', // 选手一 金球 选择情况
        '未打', // 选手二 银球一 选择情况
        '未打', // 选手二 银球二 选择情况
        '未打', // 选手二 银球三 选择情况
        '未打', // 选手二 银球四 选择情况
        '未打', // 选手二 金球 选择情况
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
  
    this.handleScore1()
    this.handleScore2()
    this.handleScore3()
    this.handleScore4()
    this.handleScore5()
    this.handleScore6()
    this.handleScore7()
    this.handleScore8()
    this.handleScore9()
    this.handleScorex()

    let { 
      wbId, 
      board,
      clubNameOne,
      clubNameTwo,
      clubMarkOne,
      clubMarkTwo,
      playerNameOne,
      playerNameTwo,
      playerMarkOne,
      playerMarkTwo,
      firSilverOne,
      secSilverOne,
      thdSliverOne,
      fthSliverOne,
      goldOne,
      firSilverTwo,
      secSilverTwo,
      thdSliverTwo,
      fthSliverTwo,
      goldTwo,
      selectedBtn1,
      selectedBtn2,
      selectedBtn3,
      selectedBtn4,
      selectedBtn5,
      selectedBtn6,
      selectedBtn7,
      selectedBtn8,
      selectedBtn9,
      selectedBtnx
    } = this.state

    let item1 = {...board[0]}
    item1 = clubNameOne
    board[0] = item1
    
    let item2 = {...board[1]}
    item2 = clubNameTwo
    board[1] = item2
    
    let item3 = {...board[2]}
    item3 = clubMarkOne
    board[2] = item3
    
    let item4 = {...board[3]}
    item4 = clubMarkTwo
    board[3] = item4
    
    let item5 = {...board[4]}
    item5 = playerNameOne
    board[4] = item5
    
    let item6 = {...board[5]}
    item6 = playerNameTwo
    board[5] = item6
    
    let item7 = {...board[6]}
    item7 = playerMarkOne
    board[6] = item7
    
    let item8 = {...board[7]}
    item8 = playerMarkTwo
    board[7] = item8
    
    let item9 = {...board[8]}
    item9 = firSilverOne
    board[8] = item9
    
    let item10 = {...board[9]}
    item10 = secSilverOne
    board[9] = item10
    
    let item11 = {...board[10]}
    item11 = thdSliverOne
    board[10] = item11
    
    let item12 = {...board[11]}
    item12 = fthSliverOne
    board[11] = item12
    
    let item13 = {...board[12]}
    item13 = goldOne
    board[12] = item13
    
    let item14 = {...board[13]}
    item14 = goldTwo
    board[13] = item14
    
    let item15 = {...board[14]}
    item15 = fthSliverTwo
    board[14] = item15
    
    let item16 = {...board[15]}
    item16 = thdSliverTwo
    board[15] = item16
    
    let item17 = {...board[16]}
    item17 = secSilverTwo
    board[16] = item17
    
    let item18 = {...board[17]}
    item18 = firSilverTwo
    board[17] = item18
    
    let item19 = {...board[18]}
    item19 = selectedBtn1
    board[18] = item19
    
    let item20 = {...board[19]}
    item20 = selectedBtn2
    board[19] = item20
    
    let item21 = {...board[20]}
    item21 = selectedBtn3
    board[20] = item21
    
    let item22 = {...board[21]}
    item22 = selectedBtn4
    board[21] = item22
    
    let item23 = {...board[22]}
    item23 = selectedBtn5
    board[22] = item23
    
    let item24 = {...board[27]}
    item24 = selectedBtn6
    board[27] = item24
    
    let item25 = {...board[26]}
    item25 = selectedBtn7
    board[26] = item25
    
    let item26 = {...board[25]}
    item26 = selectedBtn8
    board[25] = item26
    
    let item27 = {...board[24]}
    item27 = selectedBtn9
    board[24] = item27
    
    let item28 = {...board[23]}
    item28 = selectedBtnx
    board[23] = item28
    
    this.setState({board})
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

  resetScore () {
    let { 
      wbId, 
      board,
      clubNameOne,
      clubNameTwo,
      clubMarkOne,
      clubMarkTwo,
      playerNameOne,
      playerNameTwo,
      playerMarkOne,
      playerMarkTwo,
    } = this.state
    
    let item1 = {...board[0]}
    item1 = clubNameOne
    board[0] = item1
    
    let item2 = {...board[1]}
    item2 = clubNameTwo
    board[1] = item2
    
    let item3 = {...board[2]}
    item3 = clubMarkOne
    board[2] = item3
    
    let item4 = {...board[3]}
    item4 = clubMarkTwo
    board[3] = item4
    
    let item5 = {...board[4]}
    item5 = playerNameOne
    board[4] = item5
    
    let item6 = {...board[5]}
    item6 = playerNameTwo
    board[5] = item6
    
    let item7 = {...board[6]}
    item7 = playerMarkOne
    board[6] = item7
    
    let item8 = {...board[7]}
    item8 = playerMarkTwo
    board[7] = item8

    let item9 = {...board[8]}
    item9 = ''
    board[8] = item9
    
    let item10 = {...board[9]}
    item10 = ''
    board[9] = item10
    
    let item11 = {...board[10]}
    item11 = ''
    board[10] = item11
    
    let item12 = {...board[11]}
    item12 = ''
    board[11] = item12
    
    let item13 = {...board[12]}
    item13 = ''
    board[12] = item13
    
    let item14 = {...board[13]}
    item14 = ''
    board[13] = item14
    
    let item15 = {...board[14]}
    item15 = ''
    board[14] = item15
    
    let item16 = {...board[15]}
    item16 = ''
    board[15] = item16
    
    let item17 = {...board[16]}
    item17 = ''
    board[16] = item17
    
    let item18 = {...board[17]}
    item18 = ''
    board[17] = item18
    
    let item19 = {...board[18]}
    item19 = '未打'
    board[18] = item19
    
    let item20 = {...board[19]}
    item20 = '未打'
    board[19] = item20
    
    let item21 = {...board[20]}
    item21 = '未打'
    board[20] = item21
    
    let item22 = {...board[21]}
    item22 = '未打'
    board[21] = item22
    
    let item23 = {...board[22]}
    item23 = '未打'
    board[22] = item23
    
    let item24 = {...board[27]}
    item24 = '未打'
    board[27] = item24
    
    let item25 = {...board[26]}
    item25 = '未打'
    board[26] = item25
    
    let item26 = {...board[25]}
    item26 = '未打'
    board[25] = item26
    
    let item27 = {...board[24]}
    item27 = '未打'
    board[24] = item27
    
    let item28 = {...board[23]}
    item28 = '未打'
    board[23] = item28
    
    this.setState({board})
    this.setState({
      selectedBtn1: '未打',
      selectedBtn2: '未打',
      selectedBtn3: '未打',
      selectedBtn4: '未打',
      selectedBtn5: '未打',
      selectedBtn6: '未打',
      selectedBtn7: '未打',
      selectedBtn8: '未打',
      selectedBtn9: '未打',
      selectedBtnx: '未打',
      firSilverOne:'',
      secSilverOne:'',
      thdSliverOne:'',
      fthSliverOne:'',
      goldOne:'',
      firSilverTwo:'',
      secSilverTwo:'',
      thdSliverTwo:'',
      fthSliverTwo:'',
      goldTwo:'',
    })

    console.log(this.state)

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
      console.log("重置白板数据白板成功");
    }
  }  

  // resetAll () {
  //   let { wbId, board } = this.state

  //   this.setState({
  //     clubNameOne: '',
  //     clubNameTwo: '',
  //     clubMarkOne: '',
  //     clubMarkTwo: '',
  //     playerNameOne: '',
  //     playerNameTwo: '',
  //     playerMarkOne: '',
  //     playerMarkTwo: '',
  //     firSilverOne: '',
  //     secSilverOne: '',
  //     thdSliverOne: '',
  //     fthSliverOne: '',
  //     goldOne: '',
  //     firSilverTwo: '',
  //     secSilverTwo: '',
  //     thdSliverTwo: '',
  //     fthSliverTwo: '',
  //     goldTwo: '',
  //     selectedBtn1: '未打',
  //     selectedBtn2: '未打',
  //     selectedBtn3: '未打',
  //     selectedBtn4: '未打',
  //     selectedBtn5: '未打',
  //     selectedBtn6: '未打',
  //     selectedBtn7: '未打',
  //     selectedBtn8: '未打',
  //     selectedBtn9: '未打',
  //     selectedBtnx: '未打',
  //     board:[
  //       '', //俱乐部一名称
  //       '', //俱乐部二名称
  //       '', //俱乐部一得分
  //       '', //俱乐部二得分
  //       '', //选手一名称
  //       '', //选手二名称
  //       '', //选手一得分
  //       '', //选手二得分
  //       '', //选手一 银球一
  //       '', //选手一 银球二
  //       '', //选手一 银球三
  //       '', //选手一 银球四
  //       '', //选手一 金球
  //       '', //选手二 金球
  //       '', //选手二 银球四
  //       '', //选手二 银球三
  //       '', //选手二 银球二
  //       '', //选手二 银球一
  //       '未打', // 选手一 银球一 选择情况
  //       '未打', // 选手一 银球二 选择情况
  //       '未打', // 选手一 银球三 选择情况
  //       '未打', // 选手一 银球四 选择情况
  //       '未打', // 选手一 金球 选择情况
  //       '未打', // 选手二 银球一 选择情况
  //       '未打', // 选手二 银球二 选择情况
  //       '未打', // 选手二 银球三 选择情况
  //       '未打', // 选手二 银球四 选择情况
  //       '未打', // 选手二 金球 选择情况
  //     ]
  //   })

  //   console.log(this.state)

  //   this.emitMessage(board)
  //   // 发送数据到独立白板
  //   if(this.state.wbId){
  //     hyExt.stream.sendToExtraWhiteBoard({
  //       wbId,
  //       data: JSON.stringify(board),
  //       // data: board
  //     }).catch(
  //       (err)=>{console.log(err)}
  //     )
  //     console.log("重置白板数据白板成功");
  //   }
  // }  

  

  handleScore1() {

    console.log(this.state.selectedBtn1)

    let status = this.state.selectedBtn1
    if (status == '进') {
      this.setState({firSilverOne: '✔'})
    } else if (status == '空') {
      this.setState({firSilverOne: '✘'})
    } else {
      this.setState({firSilverOne: ''})
    }

    console.log(this.state.firSilverOne)

    // let {board, firSilverOne} = this.state
    // console.log(firSilverOne)
    // let temps = [...board]
    // let temp = {...board[8]}
    // temp = firSilverOne
    // board[8] = temp
    // console.log(temps)
    // this.setState({board: temps})
    // console.log(board)

  }
  
  buttonSelected1 = selectedBtn1 => ev =>{
    this.setState({ selectedBtn1 })

    console.log(selectedBtn1)

    // if (this.state.selectedBtn1 == '进') {
    //   this.setState({firSilverOne: '✔'})
    // } else if (this.state.selectedBtn1 == '空') {
    //   this.setState({firSilverOne: '✘'})
    // } else {
    //   this.setState({firSilverOne: ''})
    // }

    console.log(this.state.firSilverOne)

    // this.handleScore1()
    
  }

  buttonSelected2 = selectedBtn2 => ev =>{
    this.setState({ selectedBtn2 })

    let board = [...this.state.board]
    let btn1 = {...board[19]}
    btn1 = selectedBtn2
    board[19] = btn1
    this.setState({board})

  }

  handleScore2() {
    if (this.state.selectedBtn2 == '进') {
      this.setState({secSilverOne: '✔'})
    } else if (this.state.selectedBtn2 == '空') {
      this.setState({secSilverOne: '✘'})
    } else {
      this.setState({secSilverOne: ''})
    }
  }

  buttonSelected3 = selectedBtn3 => ev =>{
    this.setState({ selectedBtn3 })

    let board = [...this.state.board]
    let btn1 = {...board[20]}
    btn1 = selectedBtn3
    board[20] = btn1
    this.setState({board})

  }

  handleScore3() {
    if (this.state.selectedBtn3 == '进') {
      this.setState({thdSliverOne: '✔'})
    } else if (this.state.selectedBtn3 == '空') {
      this.setState({thdSliverOne: '✘'})
    } else {
      this.setState({thdSliverOne: ''})
    }
  }

  buttonSelected4 = selectedBtn4 => ev =>{
    this.setState({ selectedBtn4 })

    let board = [...this.state.board]
    let btn1 = {...board[21]}
    btn1 = selectedBtn4
    board[21] = btn1
    this.setState({board})

  }

  handleScore4() {
    if (this.state.selectedBtn4 == '进') {
      this.setState({fthSliverOne: '✔'})
    } else if (this.state.selectedBtn4 == '空') {
      this.setState({fthSliverOne: '✘'})
    } else {
      this.setState({fthSliverOne: ''})
    }
  }

  buttonSelected5 = selectedBtn5 => ev =>{
    this.setState({ selectedBtn5 })

    let board = [...this.state.board]
    let btn1 = {...board[22]}
    btn1 = selectedBtn5
    board[22] = btn1
    this.setState({board})

  }

  handleScore5() {
    if (this.state.selectedBtn5 == '进') {
      this.setState({goldOne: '✔'})
    } else if (this.state.selectedBtn5 == '空') {
      this.setState({goldOne: '✘'})
    } else {
      this.setState({goldOne: ''})
    }
  }

  buttonSelected6 = selectedBtn6 => ev =>{
    this.setState({ selectedBtn6 })

    let board = [...this.state.board]
    let btn1 = {...board[27]}
    btn1 = selectedBtn6
    board[27] = btn1
    this.setState({board})

  }

  handleScore6() {
    if (this.state.selectedBtn6 == '进') {
      this.setState({firSilverTwo: '✔'})
    } else if (this.state.selectedBtn6 == '空') {
      this.setState({firSilverTwo: '✘'})
    } else {
      this.setState({firSilverTwo: ''})
    }
  }

  buttonSelected7 = selectedBtn7 => ev =>{
    this.setState({ selectedBtn7 })

    let board = [...this.state.board]
    let btn1 = {...board[26]}
    btn1 = selectedBtn7
    board[26] = btn1
    this.setState({board})

  }

  handleScore7() {
    if (this.state.selectedBtn7 == '进') {
      this.setState({secSilverTwo: '✔'})
    } else if (this.state.selectedBtn7 == '空') {
      this.setState({secSilverTwo: '✘'})
    } else {
      this.setState({secSilverTwo: ''})
    }
  }

  buttonSelected8 = selectedBtn8 => ev =>{
    this.setState({ selectedBtn8 })

    let board = [...this.state.board]
    let btn1 = {...board[25]}
    btn1 = selectedBtn8
    board[25] = btn1
    this.setState({board})

  }

  handleScore8() {
    if (this.state.selectedBtn8 == '进') {
      this.setState({thdSliverTwo: '✔'})
    } else if (this.state.selectedBtn8 == '空') {
      this.setState({thdSliverTwo: '✘'})
    } else {
      this.setState({thdSliverTwo: ''})
    }
  }

  buttonSelected9 = selectedBtn9 => ev =>{
    this.setState({ selectedBtn9 })

    let board = [...this.state.board]
    let btn1 = {...board[24]}
    btn1 = selectedBtn9
    board[24] = btn1
    this.setState({board})

  }

  handleScore9() {
    if (this.state.selectedBtn9 == '进') {
      this.setState({fthSliverTwo: '✔'})
    } else if (this.state.selectedBtn9 == '空') {
      this.setState({fthSliverTwo: '✘'})
    } else {
      this.setState({fthSliverTwo: ''})
    }
  }

  buttonSelectedx = selectedBtnx => ev =>{
    this.setState({ selectedBtnx })

    let board = [...this.state.board]
    let btn1 = {...board[23]}
    btn1 = selectedBtnx
    board[23] = btn1
    this.setState({board})

  }

  handleScorex() {
    if (this.state.selectedBtnx == '进') {
      this.setState({goldTwo: '✔'})
    } else if (this.state.selectedBtnx == '空') {
      this.setState({goldTwo: '✘'})
    } else {
      this.setState({goldTwo: ''})
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
            <td className="units"><text className = 'scoreTexts'>{this.state.board[8] || ''} </text></td>
            <td className="units"><text className = 'scoreTexts'>{this.state.board[9] || ''} </text></td>
            <td className="units"><text className = 'scoreTexts'>{this.state.board[10] || ''}</text></td>
            <td className="units"><text className = 'scoreTexts'>{this.state.board[11] || ''}</text></td>
            <td className="units"><text className = 'scoreTexts'>{this.state.board[12] || ''}</text></td>
            <td className="units"><text className = 'scoreTexts'>{this.state.board[13] || ''}</text></td>
            <td className="units"><text className = 'scoreTexts'>{this.state.board[14] || ''}</text></td>
            <td className="units"><text className = 'scoreTexts'>{this.state.board[15] || ''}</text></td>
            <td className="units"><text className = 'scoreTexts'>{this.state.board[16] || ''}</text></td>
            <td className="units"><text className = 'scoreTexts'>{this.state.board[17] || ''}</text></td>
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
            <Text className = 'label'>俱乐部二名称</Text>
            <Input className = 'input' blurOnSubmit={false} placeholder='输入' value={this.state.clubNameTwo} onChange={v => this.setState({ clubNameTwo: v })} />
          </View>
          <View className = 'group'>
            <Text className = 'label'>俱乐部一分数</Text>
            <Input className = 'input' blurOnSubmit={false} placeholder='输入' value={this.state.clubMarkOne} onChange={r => this.setState({ clubMarkOne: r })} />
          </View>
          <View className = 'group'>
            <Text className = 'label'>俱乐部二分数</Text>
            <Input className = 'input' blurOnSubmit={false} placeholder='输入' value={this.state.clubMarkTwo} onChange={r => this.setState({ clubMarkTwo: r })} />
          </View>
          <View className = 'group'>
            <Text className = 'label'>选手一名称</Text>
            <Input className = 'input' blurOnSubmit={false} placeholder='输入' value={this.state.playerNameOne} onChange={r => this.setState({ playerNameOne: r })} />
          </View>
          <View className = 'group'>  
            <Text className = 'label'>选手二名称</Text>
            <Input className = 'input' blurOnSubmit={false} placeholder='输入' value={this.state.playerNameTwo} onChange={r => this.setState({ playerNameTwo: r })} />
          </View>
          <View className = 'group'>  
            <Text className = 'label'>选手一分数</Text>
            <Input className = 'input' blurOnSubmit={false} placeholder='输入' value={this.state.playerMarkOne} onChange={r => this.setState({ playerMarkOne: r })} />
          </View>
          <View className = 'group'>  
            <Text className = 'label'>选手二分数</Text>
            <Input className = 'input' blurOnSubmit={false} placeholder='输入' value={this.state.playerMarkTwo} onChange={r => this.setState({ playerMarkTwo: r })} />
          </View>
          </View>
          <Text className = 'scoreLabel'>选手一进球</Text>
          <View className = 'scoreGroup'>
            <View className = 'switch'>
              <Text className = 'scoreLabel'>银球一</Text>
              {
                ['进', '空', '未打'].map(key =>
                  <Button className = {key === this.state.selectedBtn1 ? 'btnSelected' : 'scButton'} key = {key} onPress = {this.buttonSelected1(key)}><text style = {{fontSize: 12}}>{key}</text></Button>
                  )
              }
            </View>
            <View className = 'switch'>
              <Text className = 'scoreLabel'>银球二</Text>
              {
                ['进', '空', '未打'].map(key =>
                  <Button className = {key === this.state.selectedBtn2 ? 'btnSelected' : 'scButton'} key = {key} onPress = {this.buttonSelected2(key)}><text style = {{fontSize: 12}}>{key}</text></Button>
                  )
              }
            </View>
            <View className = 'switch'>
              <Text className = 'scoreLabel'>银球三</Text>
              {
                ['进', '空', '未打'].map(key =>
                  <Button className = {key === this.state.selectedBtn3 ? 'btnSelected' : 'scButton'} key = {key} onPress = {this.buttonSelected3(key)}><text style = {{fontSize: 12}}>{key}</text></Button>
                  )
              }
            </View>
            <View className = 'switch'>
              <Text className = 'scoreLabel'>银球四</Text>
              {
                ['进', '空', '未打'].map(key =>
                  <Button className = {key === this.state.selectedBtn4 ? 'btnSelected' : 'scButton'} key = {key} onPress = {this.buttonSelected4(key)}><text style = {{fontSize: 12}}>{key}</text></Button>
                  )
              }
            </View>
            <View className = 'switch'>
              <Text className = 'scoreLabel'>金球</Text>
              {
                ['进', '空', '未打'].map(key =>
                  <Button className = {key === this.state.selectedBtn5 ? 'btnSelected' : 'scButton'} key = {key} onPress = {this.buttonSelected5(key)}><text style = {{fontSize: 12}}>{key}</text></Button>
                  )
              }
            </View>
          </View>
          <Text className = 'scoreLabel'>选手二进球</Text>
          <View className = 'scoreGroup'>
            <View className = 'switch'>
              <Text className = 'scoreLabel'>银球一</Text>
              {
                ['进', '空', '未打'].map(key =>
                  <Button className = {key === this.state.selectedBtn6 ? 'btnSelected' : 'scButton'} key = {key} onPress = {this.buttonSelected6(key)}><text style = {{fontSize: 12}}>{key}</text></Button>
                  )
              }
            </View>
            <View className = 'switch'>
              <Text className = 'scoreLabel'>银球二</Text>
              {
                ['进', '空', '未打'].map(key =>
                  <Button className = {key === this.state.selectedBtn7 ? 'btnSelected' : 'scButton'} key = {key} onPress = {this.buttonSelected7(key)}><text style = {{fontSize: 12}}>{key}</text></Button>
                  )
              }
            </View>
            <View className = 'switch'>
              <Text className = 'scoreLabel'>银球三</Text>
              {
                ['进', '空', '未打'].map(key =>
                  <Button className = {key === this.state.selectedBtn8 ? 'btnSelected' : 'scButton'} key = {key} onPress = {this.buttonSelected8(key)}><text style = {{fontSize: 12}}>{key}</text></Button>
                  )
              }
            </View>
            <View className = 'switch'>
              <Text className = 'scoreLabel'>银球四</Text>
              {
                ['进', '空', '未打'].map(key =>
                  <Button className = {key === this.state.selectedBtn9 ? 'btnSelected' : 'scButton'} key = {key} onPress = {this.buttonSelected9(key)}><text style = {{fontSize: 12}}>{key}</text></Button>
                  )
              }
            </View>
            <View className = 'switch'>
              <Text className = 'scoreLabel'>金球</Text>
              {
                ['进', '空', '未打'].map(key =>
                  <Button className = {key === this.state.selectedBtnx ? 'btnSelected' : 'scButton'} key = {key} onPress = {this.buttonSelectedx(key)}><text style = {{fontSize: 12}}>{key}</text></Button>
                  )
              }
            </View>
          </View>

         
          <Button className='button' onPress={() => this.sendData()}><text style = {{fontSize: 12}}>更新记分板</text></Button>
          <Button className='button' onPress={() => this.resetScore()}><text style = {{fontSize: 12}}>重置进球</text></Button>
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
