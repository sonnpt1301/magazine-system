/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

$(function () {


  //sidebar menu js
  $.sidebarMenu($('.sidebar-menu'));

  // === toggle-menu js
  $(document).on("click", '.toggle-menu', function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
  });

  // === sidebar menu activation js

  $(document).on('click', function () {
    for (var i = window.location, o = $(".sidebar-menu a").filter(function () {
      return this.href == i;
    }).addClass("active").parent().addClass("active"); ;) {
      if (!o.is("li")) break;
      o = o.parent().addClass("in").parent().addClass("active");
    }
  }),


    /* Top Header */

    $(window).on('load', function () {
      $(window).on("scroll", function () {
        if ($(this).scrollTop() > 60) {
          $('.topbar-nav .navbar').addClass('bg-dark');
        } else {
          $('.topbar-nav .navbar').removeClass('bg-dark');
        }
      });

    });

});