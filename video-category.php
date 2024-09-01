
<?php include 'Videos_data.php'; ?>

<!doctype html>
<html lang="en-US">



<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  <link rel="profile" href="https://gmpg.org/xfn/11">
  <title>Video Category </title>



  <?php include "components/common-head.php" ?>

  <?php
  $Video_data = new Videos_data();
  $videoCategories = $Video_data->categoryData();

?>





</head>

<body
  class="page-template page-template-page-albums page-template-page-albums-php page page-id-165 theme-ashade woocommerce-no-js ashade-body ashade-rcp ashade-idp shadowcore-lazy--yes ashade-loading--full ashade-unloading--full ashade-header--layout01 ashade-smooth-scroll ashade-native-touch-scroll ashade-header-sticky  has-spotlight ashade-layout--vertical ashade-albums-template ashade-albums-template--grid elementor-default elementor-kit-632">
  <?php include "components/header.php" ?>
  <div class="ashade-page-title-wrap">
    <h1 class="ashade-page-title">
      <span>3 Columns Layout</span>
      Grid Works
    </h1>
  </div><!-- .ashade-page-title-wrap -->
  <main class="ashade-content-wrap ashade-content--">
    <div class="ashade-content-scroll">
      <div class="ashade-content">
        <section class="ashade-section">
          <div class="ashade-row">
            <div class="ashade-col col-12">
              <p class="ashade-intro align-center limit-width-yes">Photography is my passion. Through the lens the world
                looks different and i would like to show you this difference. You can see it in my albums that are
                presented here.</p>
            </div>
          </div>
        </section>
        <section class="ashade-section">
          <div class="ashade-row">
            <div class="ashade-col col-12">
              <div id="ashade-grid-gallery165" class="
                                ashade-albums-grid 
                                ashade-grid 
                                ashade-grid-3cols 
                                 
                                 
                                 
                                ashade-categ-labels--show">


                <!-- <div id="album-88"
                  class="ashade-album-item ashade-grid-item  post-88 ashade-albums type-ashade-albums status-publish has-post-thumbnail hentry albums-category-personal-session">
                  <div class="ashade-grid-item--inner">
                    <div class="ashade-album-item__image">
                      <div class="ashade-image ashade-lazy"
                        data-src="https://demo.uploads/2020/01/album15-alt-1024x640.jpg">
                        <img
                          src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20960%20640'%3E%3C/svg%3E"
                          width=960 height=640 alt="Goldy Shades">
                      </div>
                    </div>
                    <h5>
                      <span>Personal Session</span>
                      Goldy Shades
                    </h5>
                    <a href="albums/goldy-shades/index.html" class="ashade-album-item__link"></a>
                  </div>
                </div> -->


                <?php


// Loop through each category and render the first video's HTML
foreach ($videoCategories as $categoryKey => $category) {
  $category = (Object) $category;
  if (isset($category->video[0])) {
      $video = (Object) $category->video[0]; // Get the first video in the category
      
      ?>
      <div id="<?php echo htmlspecialchars($video->id); ?>"
           class="ashade-album-item ashade-grid-item post-<?php echo htmlspecialchars($video->id); ?> ashade-albums type-ashade-albums status-publish has-post-thumbnail hentry albums-category-<?php echo htmlspecialchars($categoryKey); ?>">
          <div class="ashade-grid-item--inner">
              <div class="ashade-album-item__image">
                  <div class="ashade-image ashade-lazy"
                       data-src="https://your-image-source-here.jpg"> <!-- Replace with actual thumbnail URL -->
                      <img
                        src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20960%20640'%3E%3C/svg%3E"
                        width=960 height=640 alt="<?php echo htmlspecialchars($video->id); ?>">
                  </div>
              </div>
              <h5>
                  <span><?php echo htmlspecialchars($category->label); ?></span>
                  <?php echo htmlspecialchars($video->id); ?>
              </h5>
              <a href="videos-grid.php?category=<?php echo urlencode($categoryKey); ?>" class="ashade-album-item__link"></a>
          </div>
      </div>
      <?php
  }
}
?>








              </div><!-- .ashade-albums-grid -->
            </div><!-- .ashade-col -->
          </div><!-- .ashade-row -->
        </section><!-- .ashade-section -->
      </div><!-- .ashade-content -->
      <?php include "components/footer.php" ?>
    </div><!-- .ashade-content-scroll -->
  </main>

  <!-- Back to Top -->
  <div class="ashade-to-top-wrap ashade-back-wrap">
    <div class="ashade-back is-to-top">
      <span>Back to</span>
      <span>Top</span>
    </div>
  </div>
  <?php include "components/aside.php" ?>



  <?php include "components/common-foot.php" ?>
</body>



</html>