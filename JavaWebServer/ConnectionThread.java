import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintStream;
import java.net.Socket;
import java.util.Date;
import java.util.zip.GZIPOutputStream;

/**
 * 项目名称：MyWebServer
 * 项目团队：
 * 文件名：Connection.java
 * 
 * 描述：暂无
 * 所在包：
 * 日期：2015年5月13日
 * 创建人：Administrator
 *
 * 
 */

/**
 * <dl>
 * <dt>项目名称：MyWebServer</dt>
 * <dd>类名称：ConnectionThread</dd>
 * <dd>类描述：无</dd>
 * <dd>创建时间：2015年5月13日 下午7:59:04</dd>
 * <dd>创建人：Administrator</dd>
 * <dd>备注：无</dd>
 * </dl>
 * 
 * @author Administrator
 * @version 1.0
 */
public class ConnectionThread extends Thread {
	Socket client;
	int counter;

	/**
	 * 
	 */
	public ConnectionThread(Socket client, int i) {
		this.client = client;
		this.counter = i;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Thread#run()
	 */
	@Override
	public void run() {
		String deskIP = client.getInetAddress().toString();
		int destport = client.getPort();
		System.out.println("Connection" + this.counter + " connected to "
				+ deskIP + " on port " + destport + ".");
		try {
			PrintStream ps = new PrintStream(client.getOutputStream());
			// DataInputStream inStream = new
			// DataInputStream(client.getInputStream());
			// String inline = inStream.re
			BufferedReader reader = new BufferedReader(new InputStreamReader(
					client.getInputStream()));
			String inline = reader.readLine();
			{
				char[] bufs = new char[1024];
				if (reader.read(bufs) != -1) {
					System.out.println(new String(bufs));
				}
			}
			System.out.println("Received: " + inline);
//			if (getrequest(inline)) {
				String filename = getfilename(inline);
				File file = new File(filename);
				if (file.exists()) {
					System.out.println(filename + " requested.");
					ps.println("HTTP/1.1 200 OK");
					ps.println("MIME-version: 1.0");
					ps.println("Content-Type: text/html; charset=utf-8");
					int len = (int) file.length();
					ps.println("Content-Length: " + len);
					ps.println();
					sendfile(ps, file);
				} else {
					file = new File("src\\404.html");
					ps.println("HTTP/1.1 404 Not Found");
					ps.println("Content-Type: text/html; charset=utf-8");
					ps.println("Content-Length: " + file.length());
					ps.println("Date: " + new Date().toGMTString());
					ps.println("Server: apache");
//					ps.println("Content-Encoding: gzip");
					ps.println();
//					GZIPOutputStream out = new GZIPOutputStream(ps);
					sendfile(ps, file);
				}
				ps.flush();
				ps.close();
				client.close();
//			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * @param out
	 * @param file
	 */
	private void sendfile(OutputStream out, File file) {
		try {
			DataInputStream inStream = new DataInputStream(new FileInputStream(
					file));
			int len = (int) file.length();
			byte[] bufs = new byte[len];
			inStream.readFully(bufs);
			out.write(bufs, 0, len);
			out.flush();
			inStream.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * @param inline
	 * @return
	 */
	private String getfilename(String s) {
		String f = s.substring(s.indexOf('/') + 1);
		f = f.substring(0, f.indexOf(' '));
		try {
			if (f.charAt(0) == '/') {
				f = f.substring(1);
			}
		} catch (Exception e) {
			// TODO: handle exception
		}
		if (f.equals("")) {
			f = "index.html";
		}
		return "src\\" + f;

	}

	/**
	 * @param inline
	 * @return
	 */
	private boolean getrequest(String s) {
		if (s.substring(0, 3).equalsIgnoreCase("get")) {
			return true;
		}
		return false;
	}
}
