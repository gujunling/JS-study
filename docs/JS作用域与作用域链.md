# JS 作用域与作用域链

## JS 作用域

### 1. 理解

- 就是一块"地盘", 一个代码段所在的区域
- 它是静态的(相对于上下文对象), 在编写代码时就确定了

### 2. 分类

- 全局作用域
- 函数作用域
- ES6 之前没有块作用域(ES6 中已经有块级作用域了)

### 3. 作用

- 隔离变量，不同作用域下同名变量不会有冲突

## 作用域与执行上下文对比

### 1. 区别

- 全局作用域之外，每个函数都会创建自己的作用域，作用域在函数定义时就已经确定了，而不是在函数调用时。
- 全局执行上下文环境是在全局作用域确定之后, js 代码马上执行之前创建。
- 函数执行上下文是在调用函数时, 函数体代码执行之前创建。

- 作用域是静态的, 只要函数定义好了就一直存在, 且不会再变化。
- 执行上下文是动态的, 调用函数时创建执行上下文, 函数调用结束时就会自动释放。

### 2. 联系

- 执行上下文(对象)是从属于所在的作用域
- 全局上下文环境==>全局作用域
- 函数上下文环境==>对应的函数使用域

## 作用域链

### 1. 理解

- 多个上下级关系的作用域形成的链, 它的方向是从下向上的(从内到外)
- 查找变量时就是沿着作用域链来查找的

### 2. 查找一个变量的查找规则

- 1.在当前作用域下的执行上下文中查找对应的属性, 如果有直接返回, 否则进入 2
- 2.在上一级作用域的执行上下文中查找对应的属性, 如果有直接返回, 否则进入 3
- 3.再次执行 2 的相同操作, 直到全局作用域, 如果还找不到就抛出找不到的异常

```
<script type="text/javascript">
    var a = 1;
    function fn1() {
    var b = 2;
    function fn2() {
        var c = 3;
        console.log(c);  //3
        console.log(b); //2
        console.log(a); //1
        console.log(d); //Uncaught ReferenceError: d is not defined
    }
    fn2();
    }
    fn1();
</script>
```

## 面试题

```
<script type="text/javascript">
    var x = 10;
    function fn() {
    console.log(x);
    }
    function show(f) {
    var x = 20;
    f();
    }
    show(fn); //10
    // 因为fn函数是一个单独的函数作用域，在这个函数作用域中找不到变量 x 的时候会沿着作用域链在全局作用域中去找。
    // 因为没有闭包，所以 fn()函数 函数作用域中的变量在 show 函数中不能被访问
</script>
```

```
<script type="text/javascript">
    var fn = function () {
    // 注意，此时的 fn 不是字符串，而是函数 fn()
    console.log(fn);
    };
    fn(); //ƒ () {console.log(fn);}

    var obj = {
    fn2: function () {
        console.log(this);
        console.log(this.fn2);

        // 此时在函数fn2内部去找其是否存在fn2函数，结果找不到，然后就去全局中寻找,
        // 而此时的全局作用域中没有定义 fn2()函数，所以找不到
        console.log(fn2);
    },
    };
    console.log(obj instanceof Object); //true
    // obj.fn2(); //Uncaught ReferenceError: fn2 is not defined
</script>
```
