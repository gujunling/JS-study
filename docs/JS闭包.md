# JS 闭包

## JS 利用闭包实现循环遍历加监听

```
<body>
    <button>测试1</button>
    <button>测试2</button>
    <button>测试3</button>
<!--
需求: 点击某个按钮, 提示"点击的是第n个按钮"
-->
    <script type="text/javascript">
        let btns = document.getElementsByTagName("button");
        //遍历加监听
        //   btns是一个伪数组，每一次都需要计算btns.length的值，所以直接按照以前的for循环去遍历，需要计算多次效率较低，
        // 可以选择在for循环外面定义或者是在for循环的i < btns.length之前的 let i = 0; 修改为如下 let i = 0, length = btns.length ，这样的话只计算一次btns.length 的值
        //   for (let i = 0, length = btns.length; i < length; i++) {
        //     let btn = btns[i];
        //   此时的点击事件会在for循环执行完了之后再执行，所以，如果使用 var 定义变量 i 的话，会导致点击事件中拿到的 i 永远都是 3 ，点击事件中在执行时弹出的提示永远都是第 4 个
        //     btn.onclick = function () {
        //       alert("第" + (i + 1) + "个");
        //     };
        //   }

        //   for (let i = 0, length = btns.length; i < length; i++) {
        //     let btn = btns[i];
        //     //将btn所对应的下标保存在btn上，解决通过 var 定义变量 i 时，点击事件中拿到的 i 永远都为 3 的情况
        //     btn.index = i;
        //     btn.onclick = function () {
        //       alert("第" + (this.index + 1) + "个");
        //     };
        //   }

        //利用闭包实现
        for (let i = 0, length = btns.length; i < length; i++) {
        (function (j) {
            let btn = btns[j];
            btn.onclick = function () {
            alert("第" + (j + 1) + "个");
            };
        })(i);
        }
    </script>
</body>
```

## JS 闭包

### 1. 如何产生闭包(Closure)?

- 当一个嵌套的内部(子)函数引用了嵌套的外部(父)函数的变量(函数)时, 就产生了闭包

### 2. 闭包到底是什么?

- 理解一: 闭包是嵌套的内部函数(绝大部分人)
- 理解二: 内部函数中包含被引用变量(函数)的对象(极少数人)
- 注意: 可以使用 chrome 调试查看，闭包存在于嵌套的内部函数中

### 3. 产生闭包的条件?

- 函数嵌套
- 内部函数引用了外部函数的数据(变量/函数)

- 注意： 调用外部函数才会产生新的闭包

```
<script type="text/javascript">
    function fn1() {
    var a = 2;
    var b = "abc";
    var c = 123456;
    function fn2() {
        //函数定义就会产生闭包(不用调用内部函数)
        console.log(a); //此函数并没有执行，只是定义了，定义函数后就会产生闭包
    }
    // fn2();
    }
    fn1();
    //   console.log(c);  //Uncaught ReferenceError: c is not defined
</script>
```

### 常见的闭包

- 将函数作为另一个函数的返回值。
- 将函数作为实参传递给另一个函数调用。

```
<script type="text/javascript">
    // 1. 将函数作为另一个函数的返回值

    //   在整个过程中只产生了一个闭包，因为 fn2() 函数只创建了一次，
    //   闭包创建了多少个只与外部函数执行多少次有关系(外部函数执行的时候才会创建内部函数)，和内部函数执行多少次没有关系
    // 如果想要创建两个闭包，则需要创建两个 fn2() 函数，即再次执行一次 fn1() 函数 即可
    function fn1() {
    var a = 2;
    function fn2() {
        a++;
        console.log(a);
    }
    return fn2;
    }
    var f = fn1();
    f(); // 3
    //   此时闭包并没有消失，所以 变量 a 此时是 3
    f(); // 4
</script>
```

```
<script type="text/javascript">
// 2. 将函数作为实参传递给另一个函数调用
      function showDelay(msg, time) {
        setTimeout(function () {
          alert(msg);
        }, time);
      }
      showDelay("小胖", 2000);
</script>
```

## JS 闭包的作用

- 1.使用函数内部的变量在函数执行完后, 仍然存活在内存中(延长了局部变量的生命周期)
- 2.让函数外部可以操作(读写)到函数内部的数据(变量/函数)

- 常见问题:
  - 1.函数执行完后, 函数内部声明的局部变量是否还存在?
    - 一般是不存在, 存在于闭包中的变量才可能存在
  - 2.在函数外部能直接访问函数内部的局部变量吗?
    - 不能, 但我们可以通过闭包让外部操作它

```
<script type="text/javascript">
    function fn1() {
    var a = 2;
    function fn2() {
        a++;
        console.log(a);
        // return a
    }
    function fn3() {
        a--;
        console.log(a);
    }
    return fn3;
    }
    var f = fn1();
    f(); // 1
    f(); // 0

    //  此时的函数内部声明的存在于闭包中的变量 a 依旧存在，
    //  闭包之中并不存在函数fn2()这个变量， 函数fn2()则因为没有被引用，所以fn2()函数已经被释放了，此时的fn2()这个函数对象成为了垃圾对象，会被回收。
    //  闭包之中也不存在函数fn3()这个变量，在函数执行完之后fn3()这个变量会被释放，但是函数对象fn3()并没有成为垃圾对象,
    //      因为在后面的语句中 var f = fn1();的f在引用，f 指向fn3()这个函数对象,如果通过 fn1()语句来调用函数，则函数fn3()也会成为垃圾对象，也会被回收。

</script>
```

## JS 闭包的生命周期

- 1.产生: 在嵌套内部函数定义执行完时就产生了(不是在调用)
- 2.死亡: 在嵌套的内部函数成为垃圾对象时

```
<script type="text/javascript">
    function fn1() {
    //此时闭包就已经产生了(函数提升, 内部函数对象已经创建了，)
    var a = 2;
    function fn2() {
        a++;
        console.log(a);
    }
    return fn2;
    }
    var f = fn1();
    f(); // 3
    f(); // 4
    f = null; //闭包死亡(包含闭包的函数对象成为垃圾对象)
</script>
```

```
<script type="text/javascript">
    function fn1() {
    var a = 2;
    var fn2 =  function () {
        a++;
        console.log(a);
    }
    //此时在函数fn2()定义执行完以后，闭包才产生
    return fn2;
    }
    var f = fn1();
    f(); // 3
    f(); // 4
    f = null; //闭包死亡(包含闭包的函数对象成为垃圾对象)
</script>
```

## 闭包的缺点

### 1. 缺点

- 函数执行完后, 函数内的局部变量没有释放, 占用内存时间会变长
- 容易造成内存泄露

### 2. 解决方式

- 及时释放（调用外部函数的实例对象置为 null）
- 能不用闭包就不用

## 面试题

参考：[https://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html](https://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html)

```
<script>
    var name = "The Window";

    var object = {
    name: "My Object",

    getNameFunc: function () {
        return function () {
        console.log(this);
        return this.name;
        };
    },
    };
    console.log(object.getNameFunc()());
    // object.getNameFunc()的返回值是一个函数，而此时是直接执行了这个返回的函数（在全局作用域中调用的此函数，此时的全局上下文为window），所以此时是window来调用
    // 此时是没有闭包的
    /*
    Window {window: Window, self: Window, document: document, name: "The Window", location: Location, …}
    The Window
    */
</script>
```

```
<script>
    var name = "The Window";

    var object = {
    name: "My Object",

    getNameFunc: function () {
        console.log("this====>", this);
        var that = this;
        return function () {
        console.log(that);
        console.log(this);
        return that.name;
        };
    },
    };
    console.log(object.getNameFunc()());
    //此时是有闭包的，这个闭包里的变量就是that ，此时的that为自己定义的这个object对象

    /*
    this====> {name: "My Object", getNameFunc: ƒ}
    {name: "My Object", getNameFunc: ƒ}
    Window {window: Window, self: Window, document: document, name: "The Window", location: Location, …}
    My Object
    */
</script>
```

```
<script>
    var name = "The Window";
    var age = 66;

    var object = {
    name: "My Object",

    getNameFunc: function () {
        console.log("this====>", this);
        var that = this;
        return function () {
        console.log(that);
        console.log(this);
        return that.age;
        };
    },
    };
    console.log(object.getNameFunc()());
    //此时是有闭包的，这个闭包里的变量就是that ，此时的that为自己定义的这个object对象

    /*
    this====> {name: "My Object", getNameFunc: ƒ}
    {name: "My Object", getNameFunc: ƒ}
    Window {window: Window, self: Window, document: document, name: "The Window", location: Location, …}
    undefined
    */
</script>
```

### 高难度面试题

```
<script type="text/javascript">
    function fun(n, t) {
    console.log(t);
    return {
        fun: function (m) {
        return fun(m, n);
        // 此时的fun值得是调用的是外层的fun()函数，并不是return内部的fun方法
        // 此时存在闭包，因为存在函数嵌套，内部函数引用了外部函数的变量 n
        // 调用外部函数才会产生新的闭包
        },
    };
    }
    var a = fun(0); //此时调用的是是外层函数的fun函数，此时的闭包中的变量 n = 0
    //此时调用的是内部的fun方法,此语句调用了内部函数，但在这个内部函数中执行了外层的函数，所以此时产生了新的闭包，但是此语句的返回值并没有被接收，
    //   所以返回的对象并没有被引用，所以新产生的对象会被回收，所以新的闭包也就消失了，所以再次调用函数时依旧使用的还是 a 中的闭包。而闭包中的变量 n 依旧为0
    a.fun(1);
    a.fun(2);
    a.fun(3);
    //undefined,0,0,0
    //在后面的这几次调用的时候使用的都是同一个闭包，闭包中的变量的值为 0

    var b = fun(0).fun(1).fun(2).fun(3);
    //undefined,0,1,2
    //   此时产生的新的闭包并没有被回收，而是被下一个调用函数时引用了，所以闭包中的变量 n 使用的是新的闭包中的变量
    //在后面的这几次调用的时候使用的都是同一个闭包，闭包中的变量的值为 0

    var c = fun(0).fun(1);
    //此时第一次调用后闭包中的变量 n 为 0,然后进行第二次调用fun(1),第二次调用后产生了新的闭包，导致 c 的闭包中的变量 n  为 1（第二次调用函数时输出的是第一次函数中生成的闭包中的变量 n ,而这个变量的值为 0 ）
    c.fun(2);
    c.fun(3);
    //undefined,0,1,1
    //在调用的时候，第二次调用的时候，闭包中的变量的值是0，所以输出结果为0，然后产生了新的闭包，
    //   而后面在调用的时候虽然产生了新的闭包，但并没有接收新的返回值，即没有产生新的对象，所以新产生的闭包也就消失了，
    //    所以后面再输出的时候闭包中的变量值为 1 ，所以输出的就是 1
</script>
```
