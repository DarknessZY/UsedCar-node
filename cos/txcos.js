  //导入腾讯云对象存储
  const COS = require('cos-nodejs-sdk-v5');
  const res = require('express/lib/response');
  //导入fs模块
  const fs = require('fs')
      // 创建腾讯云连接对象
  var cos = new COS({
      AppId: "1309702462", // 替换为你的appid
      SecretId: "AKIDDG3aswmLfiV0ECtJHzQaT5QUHn32kBMG", // 替换为你的SecretId
      SecretKey: "e18yXpqb5HCrGOFqAD0WmlTu4xZuznKa", // 替换为你的SecretKey
  });

  // 上传对象(上传图片到腾讯云)


  const uploadCos = function(filePath, filename) {
      //filePath 要上传的图片的本地地址
      //filename  设置上传到cos后的文件的名称

      return new Promise(function(resolve, reject) {
          cos.putObject({
              Bucket: "yaocar-1309702462", // 替换为你的Bucket名称
              Region: "ap-nanjing", // 设置COS所在的区域，对应关系
              Key: filename, // 设置上传到cos后的文件的名称
              StorageClass: 'STANDARD',
              /* 当Body为stream类型时，ContentLength必传，否则onProgress不能返回正确的进度信息 */
              Body: fs.createReadStream(filePath), // 上传文件对象,以文件流形式
              onProgress: function(progressData) {
                  // console.log(JSON.stringify(progressData));
              }
          }, function(err, data) {
              if (!err) {
                  resolve(data.Location)
              } else {
                  return err
              }
          });

      })

  }

  //删除图片
  const delloadCos = function(filename) {
      return new Promise(function(resolve, reject) {
          cos.deleteObject({
              Bucket: 'yaocar-1309702462', // 存储桶
              Region: 'ap-nanjing', // 地域
              Key: filename // 文件名
          }, (err, data) => {
              // data返回数据之后 应该如何处理
              resolve(data)
              console.log(err || data)
                  // this.$message.success(err || data)
          })
      })
  }
  module.exports = {
      uploadCos,
      delloadCos
  }