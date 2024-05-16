import './App.css'
//動画だとCanvasはimportしてなかったがimportいるっぽいな
import { Image, Scroll, ScrollControls, useScroll } from '@react-three/drei'
import {Canvas,useThree,useFrame} from "@react-three/fiber"
import { useRef } from 'react';

function Images(){
  //useThreeとは様々な物のサイズの管理をする事ができる
  //今回はスクロールの状態を取得している
  const {width,height} = useThree((state) => state.viewport);
  console.log(width,height)

  const group = useRef();
  
  const data =useScroll()
  //requestAnimationFrameをフックスで使えるようにするやつ↓
  useFrame(() =>{
    let groupLen  =  group.current.children.length;
    //おそらくブラウザでhtmlが読み込みこまれてからじゃないと
    //fooksが反応しないためchildrenが反応しないのでこの関数の
    //外にあるとＥｒｒｏrになる
    
    for(let i=0; i < groupLen; i++){

      group.current.children[i].material.zoom = 1 + data.range(0,1/3) /3;

    }
    // group.current.children[0].material.zoom = 1 + data.range(0,1/3) /3;
    // group.current.children[1].material.zoom = 1 + data.range(0,1/3) /3;
    // group.current.children[2].material.zoom = 1 + data.range(0,1/3) /3;
    // group.current.children[3].material.zoom = 1 + data.range(0,1/3) /3;
    
    
  }

  );
  //three.js由来のimgaeコンポーネント
  //なんかグループタグで囲む必要があるみたいやね
//imageタグのプロパティについての説明
//url ->画像のpathを渡すことでpath野画像を表示させる
//scale -> {[x,y,z]}zはレイヤーの設定みたいなものでzが大きいほど前にあるという意味になる
  return (
    <group ref = {group}>
      <Image url="./img1.jpg" scale ={[6,height,4]} position={[-3,0,1]}/>
      <Image url="./img2.jpg" scale ={3} position={[2,0,1]}/>
      <Image url="./img3.jpg" scale ={[1,3.5,1]} position={[-2.3,-height,2]}/>
      <Image url="./img4.jpg" scale ={[1.4,2,1]} position={[1,-height-0.3,3.2]}/>
    </group>
  )
}

function App() {

  //scrollcontorolsでスクロールアニメーションを実装できる
  //damping ->慣性をかける事ができる
  //pages -> 1 = 100%高さを取る なので2以上じゃないとスクロールしない
  //horizontal ={true}にすると横にスクロールするサイトを作成する事ができる
  //infinite -> trueで無限スクロールを実装できる

  return (
    <>
    
    <Canvas>
      <ScrollControls pages={2} damping={1}>

        <Scroll>

          <Images />

        </Scroll>

        <Scroll html>
          <h1 style={{position:"absolute",top:"60vh",left:"0.7em"}}>Ganesya</h1>
          <h1 style={{position:"absolute",top:"140vh",left:"40vw"}}>Site</h1>
        </Scroll>

        

      </ScrollControls>
        
    </Canvas>
    </>
    
  )
}

export default App
