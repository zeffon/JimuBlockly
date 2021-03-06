// Copyright 2008 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

goog.provide('goog.testing.FunctionMockTest');
goog.setTestOnly('goog.testing.FunctionMockTest');

goog.require('goog.array');
goog.require('goog.string');
goog.require('goog.testing');
goog.require('goog.testing.FunctionMock');
goog.require('goog.testing.Mock');
goog.require('goog.testing.StrictMock');
goog.require('goog.testing.asserts');
goog.require('goog.testing.jsunit');
goog.require('goog.testing.mockmatchers');

// Global scope so we can tear it down safely
var mockGlobal;

function tearDown() {
  if (mockGlobal) {
    mockGlobal.$tearDown();
  }
}


//----- Tests for goog.testing.FunctionMock

function testMockFunctionCallOrdering() {
  var doOneTest = function(mockFunction, success, expected_args, actual_args) {
    goog.array.forEach(expected_args, function(arg) { mockFunction(arg); });
    mockFunction.$replay();
    var callFunction = function() {
      goog.array.forEach(actual_args, function(arg) { mockFunction(arg); });
      mockFunction.$verify();
    };
    if (success) {
      callFunction();
    } else {
      assertThrowsJsUnitException(callFunction);
    }
  };

  var doTest = function(strict_ok, loose_ok, expected_args, actual_args) {
    doOneTest(
        goog.testing.createFunctionMock(), strict_ok, expected_args,
        actual_args);
    doOneTest(
        goog.testing.createFunctionMock('name'), strict_ok, expected_args,
        actual_args);
    doOneTest(
        goog.testing.createFunctionMock('name', goog.testing.Mock.STRICT),
        strict_ok, expected_args, actual_args);
    doOneTest(
        goog.testing.createFunctionMock('name', goog.testing.Mock.LOOSE),
        loose_ok, expected_args, actual_args);
  };

  doTest(true, true, [1, 2], [1, 2]);
  doTest(false, true, [1, 2], [2, 1]);
  doTest(false, false, [1, 2], [2, 2]);
  doTest(false, false, [1, 2], [1]);
  doTest(false, false, [1, 2], [1, 1]);
  doTest(false, false, [1, 2], [1]);
}

function testMocksFunctionWithNoArgs() {
  var mockFoo = goog.testing.createFunctionMock();
  mockFoo();
  mockFoo.$replay();
  mockFoo();
  mockFoo.$verify();
}

function testMocksFunctionWithOneArg() {
  var mockFoo = goog.testing.createFunctionMock();
  mockFoo('x');
  mockFoo.$replay();
  mockFoo('x');
  mockFoo.$verify();
}

function testMocksFunctionWithMultipleArgs() {
  var mockFoo = goog.testing.createFunctionMock();
  mockFoo('x', 'y');
  mockFoo.$replay();
  mockFoo('x', 'y');
  mockFoo.$verify();
}

function testFailsIfCalledWithIncorrectArgs() {
  var mockFoo = goog.testing.createFunctionMock();

  mockFoo();
  mockFoo.$replay();
  assertThrowsJsUnitException(function() { mockFoo('x'); });
  mockFoo.$reset();

  mockFoo('x');
  mockFoo.$replay();
  assertThrowsJsUnitException(function() { mockFoo(); });
  mockFoo.$reset();

  mockFoo('x');
  mockFoo.$replay();
  assertThrowsJsUnitException(function() { mockFoo('x', 'y'); });
  mockFoo.$reset();

  mockFoo('x', 'y');
  mockFoo.$replay();
  assertThrowsJsUnitException(function() { mockFoo('x'); });
  mockFoo.$reset();

  mockFoo('correct');
  mockFoo.$replay();
  assertThrowsJsUnitException(function() { mockFoo('wrong'); });
  mockFoo.$reset();

  mockFoo('correct', 'args');
  mockFoo.$replay();
  assertThrowsJsUnitException(function() { mockFoo('wrong', 'args'); });
  mockFoo.$reset();
}

function testMocksFunctionWithReturnValue() {
  var mockFoo = goog.testing.createFunctionMock();
  mockFoo().$returns('bar');
  mockFoo.$replay();
  assertEquals('bar', mockFoo());
  mockFoo.$verify();
}

function testFunctionMockWorksWhenPassedAsACallback() {
  var invoker = {
    register: function(callback) { this.callback = callback; },

    invoke: function(args) { return this.callback(args); }
  };

  var mockFunction = goog.testing.createFunctionMock();
  mockFunction('bar').$returns('baz');

  mockFunction.$replay();
  invoker.register(mockFunction);
  assertEquals('baz', invoker.invoke('bar'));
  mockFunction.$verify();
}

function testFunctionMockQuacksLikeAStrictMock() {
  var mockFunction = goog.testing.createFunctionMock();
  assertQuacksLike(mockFunction, goog.testing.StrictMock);
}


//----- Global functions for goog.testing.GlobalFunctionMock to mock

function globalFoo() {
  return 'I am Spartacus!';
}

function globalBar(who, what) {
  return [who, 'is', what].join(' ');
}


//----- Tests for goog.testing.createGlobalFunctionMock

function testMocksGlobalFunctionWithNoArgs() {
  mockGlobal = goog.testing.createGlobalFunctionMock('globalFoo');
  mockGlobal().$returns('No, I am Spartacus!');

  mockGlobal.$replay();
  assertEquals('No, I am Spartacus!', globalFoo());
  mockGlobal.$verify();
}

function testMocksGlobalFunctionUsingGlobalName() {
  goog.testing.createGlobalFunctionMock('globalFoo');
  globalFoo().$returns('No, I am Spartacus!');

  globalFoo.$replay();
  assertEquals('No, I am Spartacus!', globalFoo());
  globalFoo.$verify();
  globalFoo.$tearDown();
}

function testMocksGlobalFunctionWithArgs() {
  var mockReturnValue = 'Noam is Chomsky!';
  mockGlobal = goog.testing.createGlobalFunctionMock('globalBar');
  mockGlobal('Noam', 'Spartacus').$returns(mockReturnValue);

  mockGlobal.$replay();
  assertEquals(mockReturnValue, globalBar('Noam', 'Spartacus'));
  mockGlobal.$verify();
}

function testGlobalFunctionMockFailsWithIncorrectArgs() {
  mockGlobal = goog.testing.createGlobalFunctionMock('globalBar');
  mockGlobal('a', 'b');

  mockGlobal.$replay();

  assertThrowsJsUnitException(function() { globalBar('b', 'a'); });
}

function testGlobalFunctionMockQuacksLikeAFunctionMock() {
  mockGlobal = goog.testing.createGlobalFunctionMock('globalFoo');
  assertQuacksLike(mockGlobal, goog.testing.FunctionMock);
}

function testMockedFunctionsAvailableInGlobalAndGoogGlobalAndWindowScope() {
  mockGlobal = goog.testing.createGlobalFunctionMock('globalFoo');

  // we expect this call 3 times through global, goog.global and window scope
  mockGlobal().$times(3);

  mockGlobal.$replay();
  goog.global.globalFoo();
  window.globalFoo();
  globalFoo();
  mockGlobal.$verify();
}

function testTearDownRestoresOriginalGlobalFunction() {
  mockGlobal = goog.testing.createGlobalFunctionMock('globalFoo');
  mockGlobal().$returns('No, I am Spartacus!');

  mockGlobal.$replay();
  assertEquals('No, I am Spartacus!', globalFoo());
  mockGlobal.$tearDown();
  assertEquals('I am Spartacus!', globalFoo());
  mockGlobal.$verify();
}

function testTearDownHandlesMultipleMocking() {
  var mock1 = goog.testing.createGlobalFunctionMock('globalFoo');
  var mock2 = goog.testing.createGlobalFunctionMock('globalFoo');
  var mock3 = goog.testing.createGlobalFunctionMock('globalFoo');
  mock1().$returns('No, I am Spartacus 1!');
  mock2().$returns('No, I am Spartacus 2!');
  mock3().$returns('No, I am Spartacus 3!');

  mock1.$replay();
  mock2.$replay();
  mock3.$replay();
  assertEquals('No, I am Spartacus 3!', globalFoo());
  mock3.$tearDown();
  assertEquals('No, I am Spartacus 2!', globalFoo());
  mock2.$tearDown();
  assertEquals('No, I am Spartacus 1!', globalFoo());
  mock1.$tearDown();
  assertEquals('I am Spartacus!', globalFoo());
}

function testGlobalFunctionMockCallOrdering() {
  var mock = goog.testing.createGlobalFunctionMock('globalFoo');
  mock(1);
  mock(2);
  mock.$replay();
  assertThrowsJsUnitException(function() { globalFoo(2); });
  mock.$tearDown();

  mock = goog.testing.createGlobalFunctionMock(
      'globalFoo', goog.testing.Mock.STRICT);
  mock(1);
  mock(2);
  mock.$replay();
  globalFoo(1);
  globalFoo(2);
  mock.$verify();
  mock.$tearDown();

  mock = goog.testing.createGlobalFunctionMock(
      'globalFoo', goog.testing.Mock.STRICT);
  mock(1);
  mock(2);
  mock.$replay();
  assertThrowsJsUnitException(function() { globalFoo(2); });
  mock.$tearDown();

  mock = goog.testing.createGlobalFunctionMock(
      'globalFoo', goog.testing.Mock.LOOSE);
  mock(1);
  mock(2);
  mock.$replay();
  globalFoo(2);
  globalFoo(1);
  mock.$verify();
  mock.$tearDown();
}

//----- Functions for goog.testing.MethodMock to mock

var mynamespace = {};

mynamespace.myMethod = function() {
  return 'I should be mocked.';
};

function testMocksMethod() {
  mockMethod = goog.testing.createMethodMock(mynamespace, 'myMethod');
  mockMethod().$returns('I have been mocked!');

  mockMethod.$replay();
  assertEquals('I have been mocked!', mockMethod());
  mockMethod.$verify();
}

function testMocksMethodInNamespace() {
  goog.testing.createMethodMock(mynamespace, 'myMethod');
  mynamespace.myMethod().$returns('I have been mocked!');

  mynamespace.myMethod.$replay();
  assertEquals('I have been mocked!', mynamespace.myMethod());
  mynamespace.myMethod.$verify();
  mynamespace.myMethod.$tearDown();
}

function testMethodMockCanOnlyMockExistingMethods() {
  assertThrows(function() {
    goog.testing.createMethodMock(mynamespace, 'doesNotExist');
  });
}

function testMethodMockCallOrdering() {
  goog.testing.createMethodMock(mynamespace, 'myMethod');
  mynamespace.myMethod(1);
  mynamespace.myMethod(2);
  mynamespace.myMethod.$replay();
  assertThrowsJsUnitException(function() { mynamespace.myMethod(2); });
  mynamespace.myMethod.$tearDown();

  goog.testing.createMethodMock(
      mynamespace, 'myMethod', goog.testing.Mock.STRICT);
  mynamespace.myMethod(1);
  mynamespace.myMethod(2);
  mynamespace.myMethod.$replay();
  mynamespace.myMethod(1);
  mynamespace.myMethod(2);
  mynamespace.myMethod.$verify();
  mynamespace.myMethod.$tearDown();

  goog.testing.createMethodMock(
      mynamespace, 'myMethod', goog.testing.Mock.STRICT);
  mynamespace.myMethod(1);
  mynamespace.myMethod(2);
  mynamespace.myMethod.$replay();
  assertThrowsJsUnitException(function() { mynamespace.myMethod(2); });
  mynamespace.myMethod.$tearDown();

  goog.testing.createMethodMock(
      mynamespace, 'myMethod', goog.testing.Mock.LOOSE);
  mynamespace.myMethod(1);
  mynamespace.myMethod(2);
  mynamespace.myMethod.$replay();
  mynamespace.myMethod(2);
  mynamespace.myMethod(1);
  mynamespace.myMethod.$verify();
  mynamespace.myMethod.$tearDown();
}

//----- Functions for goog.testing.createConstructorMock to mock

var constructornamespace = {};

constructornamespace.MyConstructor = function() {};

constructornamespace.MyConstructor.prototype.myMethod = function() {
  return 'I should be mocked.';
};

constructornamespace.MyConstructorWithArgument = function(argument) {
  this.argument_ = argument;
};

constructornamespace.MyConstructorWithArgument.prototype.myMethod = function() {
  return this.argument_;
};

constructornamespace.MyConstructorWithClassMembers = function() {};

constructornamespace.MyConstructorWithClassMembers.CONSTANT = 42;

constructornamespace.MyConstructorWithClassMembers.classMethod = function() {
  return 'class method return value';
};

function testConstructorMock() {
  var mockObject =
      new goog.testing.StrictMock(constructornamespace.MyConstructor);
  var mockConstructor =
      goog.testing.createConstructorMock(constructornamespace, 'MyConstructor');
  mockConstructor().$returns(mockObject);
  mockObject.myMethod().$returns('I have been mocked!');

  mockConstructor.$replay();
  mockObject.$replay();
  assertEquals(
      'I have been mocked!',
      new constructornamespace.MyConstructor().myMethod());
  mockConstructor.$verify();
  mockObject.$verify();
  mockConstructor.$tearDown();
}

function testConstructorMockWithArgument() {
  var mockObject = new goog.testing.StrictMock(
      constructornamespace.MyConstructorWithArgument);
  var mockConstructor = goog.testing.createConstructorMock(
      constructornamespace, 'MyConstructorWithArgument');
  mockConstructor(goog.testing.mockmatchers.isString).$returns(mockObject);
  mockObject.myMethod().$returns('I have been mocked!');

  mockConstructor.$replay();
  mockObject.$replay();
  assertEquals(
      'I have been mocked!',
      new constructornamespace.MyConstructorWithArgument('I should be mocked.')
          .myMethod());
  mockConstructor.$verify();
  mockObject.$verify();
  mockConstructor.$tearDown();
}


/**
 * Test that class members are copied to the mock constructor.
 */
function testConstructorMockWithClassMembers() {
  var mockConstructor = goog.testing.createConstructorMock(
      constructornamespace, 'MyConstructorWithClassMembers');
  assertEquals(42, constructornamespace.MyConstructorWithClassMembers.CONSTANT);
  assertEquals(
      'class method return value',
      constructornamespace.MyConstructorWithClassMembers.classMethod());
  mockConstructor.$tearDown();
}

function testConstructorMockCallOrdering() {
  var instance = {};

  goog.testing.createConstructorMock(
      constructornamespace, 'MyConstructorWithArgument');
  constructornamespace.MyConstructorWithArgument(1).$returns(instance);
  constructornamespace.MyConstructorWithArgument(2).$returns(instance);
  constructornamespace.MyConstructorWithArgument.$replay();
  assertThrowsJsUnitException(function() {
    new constructornamespace.MyConstructorWithArgument(2);
  });
  constructornamespace.MyConstructorWithArgument.$tearDown();

  goog.testing.createConstructorMock(
      constructornamespace, 'MyConstructorWithArgument',
      goog.testing.Mock.STRICT);
  constructornamespace.MyConstructorWithArgument(1).$returns(instance);
  constructornamespace.MyConstructorWithArgument(2).$returns(instance);
  constructornamespace.MyConstructorWithArgument.$replay();
  new constructornamespace.MyConstructorWithArgument(1);
  new constructornamespace.MyConstructorWithArgument(2);
  constructornamespace.MyConstructorWithArgument.$verify();
  constructornamespace.MyConstructorWithArgument.$tearDown();

  goog.testing.createConstructorMock(
      constructornamespace, 'MyConstructorWithArgument',
      goog.testing.Mock.STRICT);
  constructornamespace.MyConstructorWithArgument(1).$returns(instance);
  constructornamespace.MyConstructorWithArgument(2).$returns(instance);
  constructornamespace.MyConstructorWithArgument.$replay();
  assertThrowsJsUnitException(function() {
    new constructornamespace.MyConstructorWithArgument(2);
  });
  constructornamespace.MyConstructorWithArgument.$tearDown();

  goog.testing.createConstructorMock(
      constructornamespace, 'MyConstructorWithArgument',
      goog.testing.Mock.LOOSE);
  constructornamespace.MyConstructorWithArgument(1).$returns(instance);
  constructornamespace.MyConstructorWithArgument(2).$returns(instance);
  constructornamespace.MyConstructorWithArgument.$replay();
  new constructornamespace.MyConstructorWithArgument(2);
  new constructornamespace.MyConstructorWithArgument(1);
  constructornamespace.MyConstructorWithArgument.$verify();
  constructornamespace.MyConstructorWithArgument.$tearDown();
}

//----- Helper assertions

function assertQuacksLike(obj, target) {
  for (meth in target.prototype) {
    if (!goog.string.endsWith(meth, '_')) {
      assertNotUndefined('Should have implemented ' + meth + '()', obj[meth]);
    }
  }
}
