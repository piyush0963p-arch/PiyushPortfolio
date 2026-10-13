function md5cycle(f, x) {
  var c = f[0],
    d = f[1],
    e = f[2],
    h = f[3];
  c = ff(c, d, e, h, x[0], 7, -0x28955b88);
  h = ff(h, c, d, e, x[1], 12, -0x173848aa);
  e = ff(e, h, c, d, x[2], 17, 0x242070db);
  d = ff(d, e, h, c, x[3], 22, -0x3e423112);
  c = ff(c, d, e, h, x[4], 7, -0xa83f051);
  h = ff(h, c, d, e, x[5], 12, 0x4787c62a);
  e = ff(e, h, c, d, x[6], 17, -0x57cfb9ed);
  d = ff(d, e, h, c, x[7], 22, -0x2b96aff);
  c = ff(c, d, e, h, x[8], 7, 0x698098d8);
  h = ff(h, c, d, e, x[9], 12, -0x74bb0851);
  e = ff(e, h, c, d, x[10], 17, -42063);
  d = ff(d, e, h, c, x[11], 22, -0x76a32842);
  c = ff(c, d, e, h, x[12], 7, 0x6b901122);
  h = ff(h, c, d, e, x[13], 12, -0x2678e6d);
  e = ff(e, h, c, d, x[14], 17, -0x5986bc72);
  d = ff(d, e, h, c, x[15], 22, 0x49b40821);
  c = gg(c, d, e, h, x[1], 5, -0x9e1da9e);
  h = gg(h, c, d, e, x[6], 9, -0x3fbf4cc0);
  e = gg(e, h, c, d, x[11], 14, 0x265e5a51);
  d = gg(d, e, h, c, x[0], 20, -0x16493856);
  c = gg(c, d, e, h, x[5], 5, -0x29d0efa3);
  h = gg(h, c, d, e, x[10], 9, 0x2441453);
  e = gg(e, h, c, d, x[15], 14, -0x275e197f);
  d = gg(d, e, h, c, x[4], 20, -0x182c0438);
  c = gg(c, d, e, h, x[9], 5, 0x21e1cde6);
  h = gg(h, c, d, e, x[14], 9, -0x3cc8f82a);
  e = gg(e, h, c, d, x[3], 14, -0xb2af279);
  d = gg(d, e, h, c, x[8], 20, 0x455a14ed);
  c = gg(c, d, e, h, x[13], 5, -0x561c16fb);
  h = gg(h, c, d, e, x[2], 9, -0x3105c08);
  e = gg(e, h, c, d, x[7], 14, 0x676f02d9);
  d = gg(d, e, h, c, x[12], 20, -0x72d5b376);
  c = hh(c, d, e, h, x[5], 4, -378558);
  h = hh(h, c, d, e, x[8], 11, -0x788e097f);
  e = hh(e, h, c, d, x[11], 16, 0x6d9d6122);
  d = hh(d, e, h, c, x[14], 23, -0x21ac7f4);
  c = hh(c, d, e, h, x[1], 4, -0x5b4115bc);
  h = hh(h, c, d, e, x[4], 11, 0x4bdecfa9);
  e = hh(e, h, c, d, x[7], 16, -0x944b4a0);
  d = hh(d, e, h, c, x[10], 23, -0x41404390);
  c = hh(c, d, e, h, x[13], 4, 0x289b7ec6);
  h = hh(h, c, d, e, x[0], 11, -0x155ed806);
  e = hh(e, h, c, d, x[3], 16, -0x2b10cf7b);
  d = hh(d, e, h, c, x[6], 23, 0x4881d05);
  c = hh(c, d, e, h, x[9], 4, -0x262b2fc7);
  h = hh(h, c, d, e, x[12], 11, -0x1924661b);
  e = hh(e, h, c, d, x[15], 16, 0x1fa27cf8);
  d = hh(d, e, h, c, x[2], 23, -0x3b53a99b);
  c = ii(c, d, e, h, x[0], 6, -0xbd6ddbc);
  h = ii(h, c, d, e, x[7], 10, 0x432aff97);
  e = ii(e, h, c, d, x[14], 15, -0x546bdc59);
  d = ii(d, e, h, c, x[5], 21, -0x36c5fc7);
  c = ii(c, d, e, h, x[12], 6, 0x655b59c3);
  h = ii(h, c, d, e, x[3], 10, -0x70f3336e);
  e = ii(e, h, c, d, x[10], 15, -1051523);
  d = ii(d, e, h, c, x[1], 21, -0x7a7ba22f);
  c = ii(c, d, e, h, x[8], 6, 0x6fa87e4f);
  h = ii(h, c, d, e, x[15], 10, -0x1d31920);
  e = ii(e, h, c, d, x[6], 15, -0x5cfebcec);
  d = ii(d, e, h, c, x[13], 21, 0x4e0811a1);
  c = ii(c, d, e, h, x[4], 6, -0x8ac817e);
  h = ii(h, c, d, e, x[11], 10, -0x42c50dcb);
  e = ii(e, h, c, d, x[2], 15, 0x2ad7d2bb);
  d = ii(d, e, h, c, x[9], 21, -0x14792c6f);
  f[0] = add32(c, f[0]);
  f[1] = add32(d, f[1]);
  f[2] = add32(e, f[2]);
  f[3] = add32(h, f[3]);
}
function cmn(f, x, c, d, e, h) {
  x = add32(add32(x, f), add32(d, h));
  return add32((x << e) | (x >>> (32 - e)), c);
}
function ff(f, x, c, d, e, h, i) {
  return cmn((x & c) | (~x & d), f, x, e, h, i);
}
function gg(f, x, c, d, e, h, i) {
  return cmn((x & d) | (c & ~d), f, x, e, h, i);
}
function hh(f, x, c, d, e, h, i) {
  return cmn(x ^ c ^ d, f, x, e, h, i);
}
function ii(f, x, c, d, e, h, i) {
  return cmn(c ^ (x | ~d), f, x, e, h, i);
}
function md51(f) {
  txt = "";
  var x = f.length,
    c = [0x67452301, -0x10325477, -0x67452302, 0x10325476],
    d;
  for (d = 64; d <= f.length; d += 64) {
    md5cycle(c, md5blk(f.substring(d - 64, d)));
  }
  f = f.substring(d - 64);
  var e = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (d = 0; d < f.length; d++) e[d >> 2] |= f.charCodeAt(d) << (d % 4 << 3);
  e[d >> 2] |= 128 << (d % 4 << 3);
  if (d > 55) {
    md5cycle(c, e);
    for (d = 0; d < 16; d++) e[d] = 0;
  }
  e[14] = x * 8;
  md5cycle(c, e);
  return c;
}
function md5blk(f) {
  var x = [],
    c;
  for (c = 0; c < 64; c += 4) {
    x[c >> 2] =
      f.charCodeAt(c) +
      (f.charCodeAt(c + 1) << 8) +
      (f.charCodeAt(c + 2) << 16) +
      (f.charCodeAt(c + 3) << 24);
  }
  return x;
}
var hex_chr = "0123456789abcdef".split("");
function rhex(f) {
  var x = "",
    c = 0;
  for (; c < 4; c++)
    x += hex_chr[(f >> (c * 8 + 4)) & 15] + hex_chr[(f >> (c * 8)) & 15];
  return x;
}
function hex(f) {
  for (var x = 0; x < f.length; x++) f[x] = rhex(f[x]);
  return f.join("");
}
function md5(f) {
  return hex(md51(f));
}
function add32(f, x) {
  return (f + x) & 0xffffffff;
}
if (md5("hello") != "5d41402abc4b2a76b9719d911017c592") {
  function add32(f, x) {
    var c = (f & 65535) + (x & 65535),
      d = (f >> 16) + (x >> 16) + (c >> 16);
    return (d << 16) | (c & 65535);
  }
}
