import java.net.ServerSocket;
import java.net.Socket;

/**
 * 项目名称：MyWebServer
 * 项目团队：
 * 文件名：Server.java
 * 
 * 描述：暂无
 * 所在包：
 * 日期：2015年5月13日
 * 创建人：Administrator
 *
 * 
 */

/**	
 *	<dl>
 * 		<dt>项目名称：MyWebServer</dt>
 * 		<dd>类名称：Server</dd>
 * 		<dd>类描述：无</dd>
 * 		<dd>创建时间：2015年5月13日 下午7:53:58</dd>
 * 		<dd>创建人：Administrator</dd>
 * 		<dd>备注：无</dd>
 * </dl>
 * @author Administrator
 * @version 1.0
 */
public class Server {
	public static void main(String[] args) {
		int i = 1, PORT = 8080;
		ServerSocket server = null;
		Socket client = null;
		try {
			server = new ServerSocket(PORT);
			System.out.println("server is listening on port " + server.getLocalPort());
			while (true) {
				client = server.accept();
				new ConnectionThread(client, i++).start();
			}
		} catch (Exception e) {
			System.out.println(e);
		}
	}
}
