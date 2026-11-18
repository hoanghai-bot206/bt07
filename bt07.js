
// Import module http
const http = require('http');

// Tạo Web Server
const server = http.createServer((req, res) => {

    // Tạo đối tượng URL
    const myURL = new URL(req.url, `http://${req.headers.host}`);

    // Lấy đường dẫn
    const path = myURL.pathname;

    // Thiết lập kiểu nội dung trả về
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');

    // Xử lý đường dẫn /hello
    if (path === '/hello') {

        const name = myURL.searchParams.get('name');

        if (!name || !name.trim()) {
            res.statusCode = 400;
            res.end('Lỗi: Thiếu tham số name!');
        } else {
            res.statusCode = 200;
            res.end(`Xin chào ${name.trim()}`);
        }

    }

    // Xử lý đường dẫn /sum
    else if (path === '/sum') {

        const a = myURL.searchParams.get('a');
        const b = myURL.searchParams.get('b');

        if (a === null || b === null || a.trim() === '' || b.trim() === '') {
            res.statusCode = 400;
            res.end('Lỗi: Thiếu tham số a hoặc b!');
        } else if (
            !Number.isFinite(Number(a)) ||
            !Number.isFinite(Number(b))
        ) {
            res.statusCode = 400;
            res.end('Lỗi: Giá trị a hoặc b không hợp lệ!');
        } else {
            const tong = Number(a) + Number(b);

            res.statusCode = 200;
            res.end(`Tổng = ${tong}`);
        }

    }

    // Nếu đường dẫn không tồn tại
    else {
        res.statusCode = 404;
        res.end('Lỗi: Không tìm thấy đường dẫn!');
    }

});

// Khởi động Server tại cổng 3001
server.listen(3001, () => {
    console.log('Web Server đang chạy tại http://localhost:3001');
});
