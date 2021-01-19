const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product } = require('../models/Product');

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

router.post('/', (req, res) => {
  // 클라이언트에서 받은 정보들을 DB에 넣어 준다.
  const product = new Product(req.body);

  product.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  })
});

router.post('/products', (req, res) => {
  // product collection에 들어있는 모든 상품 정보 가져오기

  let limit = req.body.limit ? parseInt(req.body.limit) : 20;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;

  // limit : 몽고db에서 가져올 데이터 수 제한
  // skip: 몽공db에서 몇번째부터 데이터를 가져올지 설정
  // populate => 해당하는 모든 정보를 가져오는 메서드(여기선 writer 값에 해당하는 모든 정보 ex)이름,이메일... )
  Product.find()
    .populate("writer")
    .skip(skip)
    .limit(limit)
    .exec((err, productInfo) => {
      if (err) return res.status(400).json({ success: false, err });

      return res.status(200).json({
        success: true,
        productInfo,
        postSize: productInfo.length
      });
    })

});


module.exports = router;
