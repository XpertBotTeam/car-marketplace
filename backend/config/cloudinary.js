const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary');


cloudinary.config({ 
    cloud_name: 'datxpncs4', 
    api_key: '471199185224347', 
    api_secret: 'i3VhyANpunYYxx-q9is337Ggrzs' 
  });
  

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder:'CarMarketPlace',
        allowedFormats:['jpeg','png','jpg']
    }
})

module.exports = {
    cloudinary,
    storage
}