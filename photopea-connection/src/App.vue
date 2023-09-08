<template>
  <div class="app-container">
    <iframe :src="`http://www.photopea.com#${photoPeaConfig}`" ref="photoPeaRef" width="800px" height="800px"></iframe>
    <img :src="targetImage" style="width:500px;height: 500px;" id="target"/>
    <input type="range" v-model="d1" :min="0" :max="100" />
  </div>
</template>
<script lang="ts" setup>
import {ref,onMounted,watch} from 'vue'
const d1 = ref(0)


const photoPeaRef = ref()

const targetImage = ref("")

const photoPeaConfig = ref(JSON.stringify(
    {
        "files": [
          "https://www.photopea.com/api/img2/pug.png"
        ],
        "environment": {
        }
    }
))

watch(d1,()=>{
  //wnd.postMessage(AAA,"*")
  // you can write some script to format image here,like autoContrast
  // ...
  wnd.postMessage(`app.activeDocument.saveToOE("png")`, "*")
})

let originFileData = null

onMounted(()=>{
  registerPhotoPea()
  const request = new XMLHttpRequest()
  request.responseType = "arraybuffer"
  request.onload = (event:any)=>{
    originFileData = event.target.data
  }
  request.send()
})
let wnd = null
const registerPhotoPea=()=>{
  photoPeaRef.value.onload = ()=>{
  wnd = photoPeaRef.value.contentWindow
  window.addEventListener("message",onMesssage)
  }
}

const onMesssage =async (event:any)=>{
  if(event.data instanceof ArrayBuffer){
    await showData(event.data)
  }
}

const showData = (data)=>{
  console.log(data)
  const blob = new Blob([data], { type: "image/png" });
  // 创建URL对象
  const url = URL.createObjectURL(blob);
  targetImage.value = url
}
</script>
<style lang="scss" scoped>
#target{
  width: 500px;
  height: 500px;
  border: 1px solid red;
}
.app-container{
  width: 100%;
  height: 100%;

}
</style>