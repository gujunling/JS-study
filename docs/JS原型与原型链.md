# JS 原型与原型链

## JS 原型

### 分类

函数的原型分为显式原型和隐式原型

- 显式原型(prototype 属性)
- 隐式原型(**proto**)

### 1. 函数的 prototype 属性

- 每个函数都有一个 prototype 属性, 它默认指向一个 Object 空对象(即称为: 原型对象)
- 原型对象中有一个属性 constructor, 它指向函数对象

- 注意：Object 空对象(原型对象)只是内容为空, 并不是真正意义上的空对象 Object.create(null), 还是能够通过原型链看到 Object.prototype 上的各种属性、方法,例如: toString()

### 2. 给原型对象添加属性(一般都是方法)

- 作用: 函数的所有实例对象自动拥有原型中的属性(方法)

### 3.显式原型&&隐式原型

1. 每个函数 function 都有一个 prototype，即显式原型(属性)
2. 每个实例对象都有一个`__proto__`，可称为隐式原型(属性)
3. 实例对象的隐式原型的值为其对应构造函数的显式原型的值，实例对象的隐式原型和其对应构造函数的显式原型指向同一个对象

### 4. 显式原型和隐式原型的区别

- 隐式原型`__proto__`是每个对象(函数、数组也是对象)都有的一个属性，而显式原型 prototype 是函数才会有（函数也有`__proto__`）的属性。
- 函数的 prototype 属性: 在定义函数时自动添加的, 默认值是一个空 Object 对象(只是内容为空, 并不是真正意义上的空对象)
- 实例对象的`__proto__`属性: 创建对象时自动添加的, 默认值为构造函数的 prototype 属性值
- 在 ES6 之前，开发者能直接操作显式原型, 但不能直接操作隐式原型,ES6 之后，也可以直接操作隐式原型

```
    //定义构造函数
    function Fn() {
      // 内部语句: this.prototype = {}
    }
    // 1. 每个函数function都有一个prototype，即显式原型属性, 默认指向一个空的Object对象
    console.log(Fn.prototype); //{constructor: ƒ}
    console.log(Fn.__proto__); //ƒ () { [native code] }

    // 2. 每个实例对象都有一个__proto__，可称为隐式原型
    //创建实例对象
    let fn = new Fn(); // 在内部写了一条语句: this.__proto__ = Fn.prototype，此时的this为fn
    console.log(fn.__proto__); //{constructor: ƒ}
    // 3. 实例对象的隐式原型的值为其对应构造函数的显式原型的值
    console.log(Fn.prototype === fn.__proto__); // true
    //给原型添加方法
    Fn.prototype.test = function () {
    console.log("原型上的test()执行了");
    };
    //通过实例调用原型的方法
    fn.test();

    // 为隐式原型添加方法
    fn.__proto__.haha = function () {
    console.log("哈哈哈哈哈哈");
    };
    // 查看隐式原型上是否包含此方法
    console.log(fn.__proto__);
```

### 5.显式原型与隐式原型内存分析图

![](https://cdn.jsdelivr.net/gh/gujunling/PicGo-image/test/20210415111111.png)

## JS 原型链

- 访问一个对象的属性时:
  - 先在自身属性中查找，找到返回
  - 如果没有, 再沿着`__proto__`这条链向上查找, 找到了就返回属性
  - 如果最终没找到, 返回 undefined
- 别名: 隐式原型链
- 作用: 查找对象的属性(方法)

### 注意点

- 函数的显式原型指向的对象默认是空 Object 实例对象(但 Object 不满足)
- 所有函数都是 Function 的实例(包含 Function，相当于 Function = new Function(),Function 是它自身的实例)，不论这个函数是如何定义的
- 所有函数的`__proto__`都是一样的，因为都是 Function 的实例,即所有函数的`__proto__`都指向` Function.prototype`
- Object 的原型对象(Object.prototype)是原型链尽头，object 的显式原型的隐式原型是 null

```
    function Fn() {}
    console.log(Fn.prototype);

    /*
    1. 函数的显式原型指向的对象默认是空Object实例对象(但Object不满足)
    */
    console.log(Fn.prototype instanceof Object); // true
    console.log(Object.prototype instanceof Object); // false
    console.log(Function.prototype instanceof Object); // true
    /*
    2. 所有函数都是Function的实例(包含Function，相当于 Function = new Function(),Function 是它自身的实例)，不论这个函数是如何定义的
        所有函数的__proto__都是一样的，因为都是Function的实例
    */
    console.log(Function.__proto__ === Function.prototype); //true
    /*
    3. Object的原型对象(Object.prototype)是原型链尽头，object的显式原型的隐式原型是null
    */
    console.log(Object.prototype.__proto__); // null
    console.log(Function.prototype.__proto__); //实际上是 Object.prototype
    console.log(Function.prototype.__proto__.__proto__); // null
```

### 原型继承

- 原型继承利用的就是原型链
- 构造函数的实例对象自动拥有构造函数原型对象的属性(方法)

### 原型链属性问题

1. 读取对象的属性值时: 会自动到原型链中查找
2. 设置对象的属性值时: 不会查找原型链, 如果当前对象中没有此属性, 直接添加此属性并设置其值
3. 方法一般定义在原型中, 属性一般通过构造函数定义在对象本身上

```
    function Fn() {}
    Fn.prototype.a = "xxx";
    let fn1 = new Fn();
    console.log(fn1.a, fn1);

    let fn2 = new Fn();
    fn2.a = "yyy";
    console.log(fn1.a, fn2.a, fn2);

    function Person(name, age) {
    this.name = name;
    this.age = age;
    }
    Person.prototype.setName = function (name) {
    this.name = name;
    };
    let p1 = new Person("Test11111", 12);
    p1.setName("Test222222");
    console.log(p1);

    let p2 = new Person("hahhaha1111", 12);
    p2.setName("hahahahhahahahah2222222s");
    console.log(p2);
    // 实例对象的隐式原型等于其构造函数的显式原型
    console.log(p1.__proto__ === p2.__proto__); // true
```

### 原型链分析图

![](https://cdn.jsdelivr.net/gh/gujunling/PicGo-image/test/2021041500000.jpg)

分析：

```
// ===============第一部分: 自定义的构造函数及其实例============
function Foo () {}  // 1. 构造函数Foo
var f1 = new Foo()  // 2. 实例对象f1
// 3. 实例对象的隐式原型 指向 其构造函数的显示原型
console.log(f1.__proto__ === Foo.prototype) // true
// 4. 构造函数的显式原型是一个空的object对象
// 5. 这个空的object对象是Object构造函数的实例
console.log(Foo.prototype.__proto__ === Object.prototype) // true
// 6. 自定义构造函数是 Function构造函数的实例
//    换句话说: Foo这个构造函数,是new Function()出来的
console.log(Foo.__proto__ === Function.prototype) // true
// ===============第一部分: 自定义的构造函数及其实例============

// =============第二部分: Object构造函数及原型链的尽头============
console.log(Object) // 1.  ƒ Object() { [native code] }
// 2. 实例对象o1、o2
var o1 = new Object()
var o2 = {}
// 3. Object构造函数也是Function构造函数的实例
//    换句话说: Object这个构造函数,也是new Function()出来的
console.log(Object.__proto__ === Function.prototype) // ture
// 4. Object构造函数的显式原型(Object.prototype)就是原型链的尽头
console.log(Object.prototype.__proto__) // 5. null
// =============第二部分: Object构造函数及原型链的尽头============


// =================第三部分: 特殊Function构造函数================
console.log(Function) // 1.  ƒ Function() { [native code] }
// 2. Function构造函数的原型对象跟其他普通的构造函数一样   隐式原型指向空object对象
console.log(Function.prototype.__proto__ === Object.prototype) // true
// 3. 重点特殊的地方: Function构造函数是自己的实例
//    换句话说: Function构造函数,是new Function()自己出来的, 即我生出我自己
console.log(Function.__proto__ === Function.prototype) // true
// 4. Function.prototype是一个函数,而不是像其他函数一样是一个空的Object对象
console.log(typeof Function.prototype) // function
// =================第三部分: 特殊Function构造函数================
```
