import http.server
import socketserver

PORT = 8000
DIRECTORY = "."

class SimpleHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def run():
    with socketserver.TCPServer(("", PORT), SimpleHTTPRequestHandler) as httpd:
        print(f"Serving HTTP on port {PORT}")
        httpd.serve_forever()

if __name__ == "__main__":
    run()
