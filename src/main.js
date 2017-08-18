const R = require('ramda');

// (Thunked (a -> b) -> a -> b) -> b
const fix = f => f(() => fix(f));

// fib: Thunked (Int -> Int) -> (Int -> Int)
const fib = R.curry((f, n) => {
  switch (n) {
    case 0:
      return 0;
    case 1:
      return 1;
    default:
      return f()(n-1) + f()(n-2);
  }
});

// memoize: Array -> (Int -> Int) -> (Int -> Int)
const memoize = R.curry((m  , f, n) => m[n] = m[n] ? m[n] : f(n));

// fibMemo: Int -> Int
const fibMemo = fix(R.compose(memoize([]), fib));
