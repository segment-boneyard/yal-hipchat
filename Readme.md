
# yal-hipchat

  A [yal-server][yal-server] plugin to log error messages into Hipchat. Generate access keys using the [v2 Hipchat API][hipchat].

[yal-server]: https://github.com/segmentio/yal-server
[hipchat]: https://www.hipchat.com/docs/apiv2

## Usage

```js
var hipchat = require('yal-hipchat');
server.use(hipchat({
  key: 'd1b2a69fd028482b45d2',
  rooms: ['Engineering'],
  level: 'critical'
});
```

## API

### hipchat(options)

  The plugin accepts the following options:

  * `key` (String) - the hipchat v2 access key (required)
  * `level` (String) - the minimum log level to send messages, defaults to `error` (optional)
  * `rooms` (Array) - an array of room names or ids to send to (optional)

## License

(The MIT License)

Copyright (c) 2014 Segment.io &lt;team@segment.io&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.