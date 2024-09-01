<?php include 'Photo_data.php'; ?>
<!doctype html>
<html lang="en-US">

<head>
  <title>Photos category</title>

  <?php include "components/common-head.php" ?>
  <script type="text/javascript" src="wp-includes/js/jquery/jquery.minf43b.js?ver=3.7.1" id="jquery-core-js"></script>

  <?php
  $Photo_data = new Photo_data();
  $photoCategories = $Photo_data->categoryData();

?>


</head>

<body
  class="page-template page-template-page-albums page-template-page-albums-php page page-id-153 theme-ashade woocommerce-no-js ashade-body ashade-rcp ashade-idp shadowcore-lazy--yes ashade-loading--full ashade-unloading--full ashade-header--layout01 ashade-smooth-scroll ashade-native-touch-scroll ashade-header-sticky  has-spotlight ashade-layout--vertical ashade-albums-template ashade-albums-template--ribbon elementor-default elementor-kit-632">

  <?php include "components/header.php" ?>


  <div class="ashade-albums-carousel-wrap ashade-categ-labels--show">
    <div class="ashade-albums-carousel is-medium link-style--button" id="albums_carousel">




<?php

// Loop through each category and render the first photo's HTML
foreach ($photoCategories as $categoryKey => $category) {
  $category= (Object) $category;
    if (isset($category->photos[0])) {
        $photo = (Object) $category->photos[0]; // Get the first photo in the category
    
        
        ?>
        <div id="<?php echo htmlspecialchars($photo->id); ?>" class="ashade-album-item ashade-albums type-ashade-albums status-publish has-post-thumbnail hentry albums-category-nature-photos">
            <div class="ashade-album-item__inner">
                <img
                    src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201143%201200'%3E%3C/svg%3E"
                    data-src="<?php echo htmlspecialchars($photo->img_src); ?>"
                    class="ashade-lazy" alt="<?php echo htmlspecialchars($photo->title ?? 'Photo Title'); ?>" width="1143" height="1200">
                <div class="ashade-album-item__overlay"></div>
                <div class="ashade-album-item__title">
                    <h2>
                        <span><?php echo htmlspecialchars($photo->title ?? 'Photo Title'); ?></span>
                        
                        <?php echo htmlspecialchars($category->label); ?>
                    </h2>
                </div>
                <!-- Updated link to include category key as a parameter -->
                <a href="photos-grid.php?category=<?php echo urlencode($categoryKey); ?>" class="ashade-button">Explore</a>
            </div>
        </div>
        <?php
    }
}
?>



     
      
    </div><!-- .ashade-albums-carousel -->
  </div><!-- .ashade-albums-carousel-wrap -->


  <?php include "components/footer.php" ?>

  <?php include "components/aside.php" ?>

  <?php include "components/common-foot.php" ?>

  <script type="text/javascript" id="ashade-core-js-js-extra">
    /* <![CDATA[ */
    var ashade_urls = {
      template:
        "https:\/\/demo.shadow-themes.com\/wp\/ashade\/wp-content\/themes\/ashade",
      ajax: "https:\/\/demo.shadow-themes.com\/wp\/ashade\/wp-admin\/admin-ajax.php",
      post_id: "62",
      ajax_nonce: "00e07a2be6",
    };
    /* ]]> */
  </script>
  <script type="text/javascript" src="wp-content/themes/ashade/assets/js/ashade-ribbonb6a4.js?ver=6.6.1"
    id="ashade-ribbon-js"></script>
</body>



</html>