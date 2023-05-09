
# Questions: 
1. What's a closure? Where in the code is there a closure? 

2. Which are the potential side-effects in any function? Could you point out any of these cases in your code? Are they expected? Can they be avoided?

# Answers:

> 1. A closure is a function that has access variables from its outer (enclosing) scope, even after the outer function has returned.  In my
> code in **Planets.vue**, the **`getData`** function is a closure since
> it has access to variables declared outside of it, such as
> **`loading`**, **`data`**, **`count`**, **`currentPage`**, and **`onPaginate`**.

> 2. Potential side effects of a function includes: modifying global variables, modifying variables outside of the function's scope, and
> performing I/O operations.  In my code in **Planets.vue**, the
> `getData` function performs an **I/O** operation by making an HTTP
> request to the [SW API](https://swapi.dev/documentation). It also
> modifies variables outside of its scope (`loading`, `data`, `count`,
> and `currentPage`), which is an expected behavior besides fetching
> data (main purpose of the function), in this case I decided to not
> return anything (*Promise<**void**>*) from it, and use the reactive
> state variables directly [api
> style](https://vuejs.org/guide/introduction.html#api-styles) -
> [reactive](https://vuejs.org/guide/extras/reactivity-in-depth.html#how-reactivity-works-in-vue).
> Then to avoid unexpected side effects, it is important to carefully
> design the function's interface to specify what it does and what it
> doesn't do, as well as handle any potential errors that may arise, in
> this case I used the Promise catch to show in the UI to the user about
> the errors occurred.