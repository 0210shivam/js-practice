//* Running Sum of 2D Array.

var nums = [1, 3, 5, 7]


function something() {
   for (i = 0; i < nums.length; i++) {
      x = nums[i]
      console.log(x);
   }
}

something();


function running_sum() {
   for (i = 1; i < nums.length; i++) {
      nums[i] = nums[i - 1] + nums[i]
   }
   return nums;
}

running_sum();

console.log(nums);
