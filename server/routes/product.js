const express = require('express');
const router = express.Router();
const multer = require('multer');

//=================================
//             Product
//=================================

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage: storage }).single("file");


router.post('/image', (req, res) => {
  // 가져온 이미지를 저장을 해준다.
  upload(req, res, err => {
    if (err) {
      return req.json({ success: false, err });
    }
    // 파일을 어디 저장했고, 무엇으로 저장했는지 정보를 클라이언트에 전달
    return res.json({ success: true, filePath: res.req.file.path, fileNmae: res.req.file.filename })
  })

});


module.exports = router;
