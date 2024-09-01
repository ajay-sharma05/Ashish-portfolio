<?php include 'Helper.php'; ?>
<!doctype html>
<html lang="en-US">


<head>

  <title>Photos grid</title>


  <?php include "components/common-head.php" ?>
<?php 
 $helper = new Helper();
 $photoCategories =  $helper->categoryData();

$category = !empty($_GET['category'])?$_GET['category']:'';

?>


</head>

<body
  class="ashade-albums-template-default single single-ashade-albums postid-91 theme-ashade woocommerce-no-js ashade-body ashade-rcp ashade-idp shadowcore-lazy--yes ashade-loading--full ashade-unloading--full ashade-header--layout01 ashade-smooth-scroll ashade-native-touch-scroll ashade-header-sticky  has-spotlight ashade-sidebar--none ashade-layout--vertical ashade-albums-back ashade-albums-template ashade-albums-template ashade-albums-template--bricks elementor-default elementor-kit-632">

  <?php include "components/header.php" ?>
  <div class="ashade-page-title-wrap">
    <h1 class="ashade-page-title">
      <span>
        <span class="ashade-meta-category ashade-post-meta">
          Wedding Photos </span>
        &nbsp;
      </span>
      New Family
    </h1>
  </div><!-- .ashade-page-title-wrap -->
  <main id="album-91"
    class="ashade-content-wrap ashade-content--boxed post-91 ashade-albums type-ashade-albums status-publish has-post-thumbnail hentry albums-category-wedding-photos">
    <div class="ashade-content-scroll">
      <div class="ashade-content">
        <section class="ashade-section">
          <div class="ashade-row">
            <div class="ashade-col col-12">
              <p class="ashade-intro align-center">The birth of a new family is truly an exciting and touching moment.
                It was a great pleasure for me to help these beautiful people capture these wonderful moments of their
                lives.</p>
            </div><!-- .ashade-col -->
          </div><!-- .ashade-row -->
        </section><!-- .ashade-section -->
        <section class="ashade-section">
          <div class="ashade-gallery-bricks ashade-grid-caption--none is-2x3">
            


<!-- Loop This Item -->
<?php

if(isset($photoCategories[$category]))
{
  $items =  $photoCategories[$category];
  
 foreach($items['photos'] as $photo){
    $photo =  $photo;
?>
<div class="ashade-gallery-item ashade-grid-item ashade-grid-item--image is-small">
              <div class="ashade-grid-item--inner">
                <a href="<?=$photo['img_src']?>" class="ashade-lightbox-link"
                  data-elementor-open-lightbox="no" data-gallery="grid_42261" data-caption="He and She"
                  data-type="image" data-size="1800x1200">
                </a>
                <div class="ashade-image ashade-lazy"
                  data-src="<?=$photo['img_src']?>">
                  <img
                    src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20960%20640'%3E%3C/svg%3E"
                    width=960 height=640 alt="New Family">
                </div><!-- .ashade-image -->
                <div class="ashade-grid-caption">He and She</div>
              </div>
            </div><!-- .ashade-gallery-item -->
            

<?php
  } 
  ?>
  
  

  <?php
}else{
  echo 'category not found';die;
} 
?>




            
          </div><!-- .ashade-grid -->
        </section><!-- .ashade-section -->
      </div><!-- .ashade-content -->
      <?php include "components/footer.php" ?>
    </div><!-- .ashade-content-scroll -->
  </main><!-- .ashade-content-wrap -->
  <!-- Back to Top -->
  <div class="ashade-to-top-wrap ashade-back-wrap">
    <div class="ashade-back is-to-top">
      <span>Back to</span>
      <span>Top</span>
    </div>
    <div class="ashade-back albums-go-back">
      <span>Return</span>
      <span>Back</span>
    </div>
  </div>


  <?php include "components/aside.php" ?>
  <?php include "components/common-foot.php" ?>

</body>



</html>