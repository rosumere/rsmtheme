<?php
// Define version
if (!defined('_VER')) {
  define('_VER', '0.1');
}

// Add theme support
add_action('after_setup_theme', 'rsmtheme_setup');
function rsmtheme_setup()
{
  add_theme_support('menus');
  add_theme_support('title-tag');
  register_nav_menus(
    [
      'header_menu' => 'Меню в шапке',
    ]
  );

  add_theme_support('html5', [
    'comment-list',
    'comment-form',
    'search-form',
    'gallery',
    'caption',
    'script',
    'style',
  ]);
}

// Add theme styles and scripts
add_action('wp_enqueue_scripts', 'rsmtheme_scripts');
function rsmtheme_scripts()
{

  wp_enqueue_style('main', get_stylesheet_directory_uri() . '/assets/css/style.min.css', array(), _VER);
  wp_enqueue_script('main', get_template_directory_uri() . '/assets/js/main.min.js', array(), _VER, true);
}

// require_once(get_template_directory() . '/inc/class-rsmtheme-header-nav.php');


/**
 * ACF Options page
 */

if (function_exists('acf_add_options_page')) {
  acf_add_options_page([
    'page_title'    => 'Основные настройки темы',
    'menu_title'    => 'Настройки темы',
    'menu_slug'     => 'theme-general-settings',
    'capability'    => 'edit_posts',
    'redirect'      => false,
    'position' => 1,
  ]);
}
