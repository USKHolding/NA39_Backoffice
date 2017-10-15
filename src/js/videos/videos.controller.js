class VideosCtrl {
  constructor(category_videos, videos, Video, $uibModal, CategoryVideo, $filter) {
    'ngInject';
    this._CategoryVideo = CategoryVideo
    this._videos = videos
    this._category_videos = category_videos
    this._Video = Video
    this.$_filter = $filter
    this._$uibModal = $uibModal
    this._newCat = false;
    this._new_category_video = {}
    // Bind is req'd because the logout method assumes
    // the execution context is within the User object.
    // this.logout = User.logout.bind(User); 
  }

  videoModal(video){
    let ctrl = this
      var modalInstance = this._$uibModal.open({
                component: 'appVideoModal',
                resolve:{
                    video: function() {
                      return video;
                    }
                }
                
           })
    modalInstance.result.then(function (result) {
      ctrl._videos[ctrl._videos.indexOf(video)] = result
    });
  }

  submitCat(){
    this._CategoryVideo.save(this._new_category_video).then(
      (res) => {
        this._category_videos.push(res)
        this._newCat = false;
      },
      (err) => {err.data}
    )
  }

  updateCat(){
    this._CategoryVideo.update(this.selected_cat).then(
      (res) => {
        this.selected_cat.edit = false;
      },
      (err) => {err.data}
    )
  }

  newVideoModal(category){
    let ctrl = this._videos
    var modalInstance = this._$uibModal.open({
        component: 'appNewVideoModal',
        resolve:{
            category: function() {
              return category;
            }
        }
        
   }).result.then(function (result) {
      ctrl.push(result)
    });
  }

  deleteCat(category){
    let ctrl = this
    var modalInstance = this._$uibModal.open({
        component: 'appDeleteModal',
        resolve:{
            item: function(){
              return category
            },
            service: function(){
              console.log(ctrl._CategoryVideo)
              return ctrl._CategoryVideo
            },
            message: function(){
              return 'Delete this category will delete all his videos, are you sure?'
            }
        }
   }).result.then(function (result) {
      if (result == 'ok'){
        ctrl._category_videos.splice(ctrl._category_videos.indexOf(category), 1)
        var videos = ctrl.$_filter('filter')(ctrl._videos, {category_video_id: ctrl.selected_cat.id})
        for (var i = videos.length -1; i >= 0; i--)
          ctrl._videos.splice(ctrl._videos.indexOf(videos[i]),1);
        ctrl.selected_cat = ctrl._category_videos[ctrl._category_videos.length - 1]
      }
      
    });
  }

}


export default VideosCtrl;