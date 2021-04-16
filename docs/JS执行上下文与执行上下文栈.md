# JS 执行上下文与执行上下文栈

## JS 执行上下文

### 1. 变量声明提升

- 通过 var 定义(声明)的变量, 在定义语句之前就可以访问到，其值为: undefined

### 2. 函数声明提升

- 通过 function 声明的函数, 在函数声明的代码之前就可以直接调用，其值为: 函数定义(对象)
- 通过表达式的方式定义的函数不会存在变量提升

```
<script type="text/javascript">
    var a = 3;
    function fn() {
    // 函数内部声明了变量 a ，但是并没有赋值(通过var声明的变量会存在变量提升)，
    // 赋值是在打印语句之后赋值的，此时也不会去函数外部寻找，因为函数内部此时声明的有变量 a
    console.log(a);
    var a = 4;
    }
    fn();

    console.log(b); //undefined  变量提升
    fn2(); //可调用  函数提升
    // fn3() //不能  变量提升

    var b = 3;

    function fn2() {
    console.log("fn2()");
    }

    var fn3 = function () {
    console.log("fn3()");
    };
</script>
```

### 二者的提升顺序

- 先执行变量提升, 再执行函数提升

```
<script type="text/javascript">
   //  先执行变量提升, 再执行函数提升，所以此时 a 的数据类型为 'function'
    function a() {}
    var a;
    console.log(typeof a); // 'function'
</script>
```

## 执行上下文

### 1. 代码分类(位置)

- 全局代码
- 函数(局部)代码

### 2. 全局执行上下文

- 在执行全局代码前将 window 确定为全局执行上下文
- 对全局数据进行预处理
  - var 定义的全局变量==>undefined, 添加为 window 的属性
  - function 声明的全局函数==>赋值(fun), 添加为 window 的方法
  - this==>赋值(window)
- 开始执行全局代码

### 3. 函数执行上下文

- 在调用函数, 准备执行函数体之前, 创建对应的函数执行上下文对象(虚拟的, 存在于栈中)
- 对局部数据进行预处理
  - 形参变量==>赋值(实参)==>添加为执行上下文的属性
  - arguments==>赋值(实参列表), 添加为执行上下文的属性
  - var 定义的局部变量==>undefined, 添加为执行上下文的属性
  - function 声明的函数 ==>赋值(fun), 添加为执行上下文的方法
  - this==>赋值(调用函数的对象)
- 开始执行函数体代码

```
<script type="text/javascript">
    console.log(a1, window.a1);
    window.a2();
    console.log(this);

    var a1 = 3;
    function a2() {
    console.log("a2()");
    }
    console.log(a1);

    console.log("---------函数执行上下文-----------");
    function fn(a1) {
    console.log(a1); //2
    console.log(a2); //undefined
    console.log(this); //window
    console.log(arguments); //伪数组[2,3,4,5,6]
    console.log(Array.isArray(arguments)); //false
    var a2 = 6;
    function a3() {
        console.log("a3()执行了");
    }
    }
    fn(2, 3, 4, 5, 6);
</script>
```

## 执行上下文栈

### 指向上下文栈流程

1. 在全局代码执行前, JS 引擎就会创建一个栈来存储管理所有的执行上下文对象
2. 在全局执行上下文(window)确定后, 将其添加到栈中(压栈)
3. 在函数执行上下文创建后, 将其添加到栈中(压栈)
4. 在当前函数执行完后,将栈顶的对象移除(出栈)
5. 当所有的代码执行完后, 栈中只剩下 window

## 面试题

```
    <!--
        1. 依次输出什么?
        gb: undefined
        fb: 1
        fb: 2
        fb: 3
        fe: 3
        fe: 2
        fe: 1
        ge: 1
        2. 整个过程中产生了几个执行上下文?  5个  f(4) ==> f(3) ==> f(2) ==> f(1) ==> window
    -->
<script type="text/javascript">
    // 执行上下文栈中的顺序从栈顶到栈底(元素从栈顶依次出栈。插入和删除都是在栈顶操作的)依次是 f(4) ==> f(3) ==> f(2) ==> f(1) ==> window ,
    // 出栈顺序则是后进先出，即f(4) ==> f(3) ==> f(2) ==> f(1) 依次出栈，依次执行相应的函数，最后留下全局上下文对象window，所以输出顺序是上面所写的
    console.log("gb: " + i);
    var i = 1;
    foo(1);
    function foo(i) {
    if (i == 4) {
        return;
    }
    console.log("fb:" + i);
    foo(i + 1); //递归调用: 在函数内部调用自己
    console.log("fe:" + i);
    }
    console.log("ge: " + i);
</script>
```

```
<script type="text/javascript">
    if (!(b in window)) {
    //  变量 b 不在window对象中时，条件才成立，才执行下面的语句
    var b = 1;
    }
    console.log(b); // undefined
</script>
```

```
<script type="text/javascript">
    var c = 1;
    function c(c) {
    console.log(c);
    var c = 3;
    }

    c(2); // 报错 Uncaught TypeError: c is not a function
    /*   因为先进行变量提升, 再进行函数提升，此时的代码就相当于是这样的,所以才会报错( c is not a function)
            var c;
            function c(c) {
                console.log(c);
                var c = 3;
            }
            c = 1;
            c(2);
    */
</script>
```
