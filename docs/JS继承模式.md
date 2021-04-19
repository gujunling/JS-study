# 继承模式

## 原型链继承

- 套路

  - 定义父类型构造函数
  - 给父类型的原型添加方法
  - 定义子类型的构造函数
  - 创建父类型的对象赋值给子类型的原型
  - 将子类型原型的构造属性设置为子类型
  - 给子类型原型添加方法
  - 创建子类型的对象: 可以调用父类型的方法

- 关键

  - 子类型的原型为父类型的一个实例对象

- 原型链继承是为了得到父类型中的方法

```
   //父类型
function Supper() {
    this.supProp = "Supper property";
}
Supper.prototype.showSupperProp = function () {
    console.log(this.supProp);
};

    //子类型
function Sub() {
    this.subProp = "Sub property";
}

    // 子类型的原型为父类型的一个实例对象
    Sub.prototype = new Supper();

    // 让子类型的原型的constructor指向子类型
    Sub.prototype.constructor = Sub;

Sub.prototype.showSubProp = function () {
    console.log(this.subProp);
};

    let sub = new Sub();
    sub.showSupperProp();
    sub.showSubProp();

    console.log(sub); // Sub
```

### 原型链继承图解

![](https://cdn.jsdelivr.net/gh/gujunling/PicGo-image/test/原型链继承.png)

## 借用构造函数继承

- 套路:

  - 定义父类型构造函数
  - 定义子类型构造函数
  - 在子类型构造函数中调用父类型构造

- 关键:

  - 在子类型构造函数中通过 call()调用父类型构造函数

- 借用构造函数继承是为了得到父类型的属性

```
function Person(name, age) {
    this.name = name;
    this.age = age;
}
function Student(name, age, price) {
    Person.call(this, name, age);
    // 相当于是借用了Person这个函数
    /*this.name = name
    this.age = age*/
    this.price = price;
}

    let s = new Student("Tom", 20, 14000);
    console.log(s.name, s.age, s.price);
```

## 原型链+借用构造函数组合继承

- 利用原型链实现对父类型对象的方法继承
- 利用 super()借用父类型构建函数初始化相同属性

```
function Person(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.setName = function (name) {
    this.name = name;
};

function Student(name, age, price) {
    Person.call(this, name, age); // 为了得到属性
    this.price = price;
}
    Student.prototype = new Person(); // 为了能看到父类型的方法
    Student.prototype.constructor = Student; //修正constructor属性
    Student.prototype.setPrice = function (price) {
        this.price = price;
    };

    let s = new Student("Tom", 24, 15000);
    s.setName("Bob");
    s.setPrice(16000);
    console.log(s.name, s.age, s.price);
```

## 补充

### new 一个对象背后到底做了什么？

- 创建一个空对象

- 给对象设置 `__proto__`属性,属性值为构造函数对象的`prototype`的属性值

- 执行构造函数体（给对象添加属性/方法）
