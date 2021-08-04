var color = {
  'reupload': '#ecb337',
  'transform': '#07c160',
  'download': '#15aeff',
  'converting': '#ff4d4d',
  'disabled': '#969696',
}
var app = new Vue({
  el: '#app',
  data: {
    lr_src: '',
    hr_src: '',
    reupload_style_object: {
      'background-color': color['disabled'],
      'cursor': 'not-allowed',
    },
    transform_style_object: {
      'background-color': color['disabled'],
      'cursor': 'not-allowed',
    },
    download_style_object: {
      'background-color': color['disabled'],
      'cursor': 'not-allowed',
    },
    converting: false,
    file_name: '',
  },
  methods: {
    // 上传图片
    uploadImage: function (event) {
      var upload_image_button = document.getElementById('upload-image')
      upload_image_button.click()
    },
    // 重新上传图片
    reuploadImage: function (event) {
      if (!this.lr_src || this.converting) return
      this.uploadImage(event)
    },
    // 上传图片完成，进行处理
    uploadImageChange: function (event) {
      var that = this
      var img = document.getElementById('upload-image').files[0]
      that.img_name = img.name
      var reader = new FileReader()
      reader.onload = function (e) {
        var txt = e.target.result
        that.lr_src = txt
        that.reupload_style_object['background-color'] = color['reupload']
        that.reupload_style_object['cursor'] = 'pointer'
        that.transform_style_object['background-color'] = color['transform']
        that.transform_style_object['cursor'] = 'pointer'
      }
      reader.readAsDataURL(img)
    },
    // 转换图片
    transformImage: function (event) {
      if (!this.lr_src) return
      this.converting = true
      this.reupload_style_object['background-color'] = color['disabled']
      this.reupload_style_object['cursor'] = 'not-allowed'
      this.transform_style_object['background-color'] = color['converting']
      this.transform_style_object['cursor'] = 'not-allowed'
      this.download_style_object['background-color'] = color['disabled']
      this.download_style_object['cursor'] = 'not-allowed'
      this.LR2HR()
    },
    // 下载大图
    downloadImage: function (event) {
      if (!this.hr_src || this.converting) return
      var pair = this.hr_src.split(',')
      var mime = pair[0].match(/:(.*?);/)[1]
      var bstr = atob(pair[1])
      var arr = new Uint8Array(bstr.length)
      for (let i = 0; i < bstr.length; i++) arr[i] = bstr.charCodeAt(i)
      var blob = new Blob([arr], { type: mime })
      var aLink = document.createElement('a')
      aLink.download = this.img_name
      aLink.href = URL.createObjectURL(blob)
      aLink.target = '_blank'
      var clickEvent = document.createEvent('MouseEvents')
      clickEvent.initEvent('click', true, true)
      aLink.dispatchEvent(clickEvent)
    },
    // LR to HR
    LR2HR: function () {
      // code to convert LR to HR
      setTimeout(() => {
        var img = document.getElementById('upload-image').files[0]
        this.hr_src = this.lr_src
        this.converting = false
        this.reupload_style_object['background-color'] = color['reupload']
        this.reupload_style_object['cursor'] = 'pointer'
        this.transform_style_object['background-color'] = color['transform']
        this.transform_style_object['cursor'] = 'pointer'
        this.download_style_object['background-color'] = color['download']
        this.download_style_object['cursor'] = 'pointer'
      }, 3 * 1000)
    }
  },
})
