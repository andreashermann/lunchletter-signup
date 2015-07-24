angular.module("lunchletterSignupApp")
  .directive("starRating", function() {
    return {
      template : "<ul class='rating'>" +
      "  <li ng-repeat='star in stars' ng-class='star' ng-click='toggle($index)'>" +
      "    <i class='fa fa-star'></i>" + //&#9733
      "  </li>" +
      "</ul>",
      scope : {
        ratingValue : "=ngModel",
        max : "=?", //optional: default is 5
      },
      link : function(scope, element, attrs) {
        if (scope.max == undefined) { scope.max = 5; }
        function updateStars() {
          scope.stars = [];
          for (var i = 0; i < scope.max; i++) {
            scope.stars.push({
              filled : i < scope.ratingValue
            });
          }
        };
        scope.toggle = function(index) {
          scope.ratingValue = index + 1;
        };
        scope.$watch("ratingValue", function(oldVal, newVal) {
          if (newVal) { updateStars(); }
        });
      }
    };
  });
