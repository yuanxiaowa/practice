import java.net.ServerSocket;
import java.net.Socket;

/**
 * ��Ŀ���ƣ�MyWebServer
 * ��Ŀ�Ŷӣ�
 * �ļ�����Server.java
 * 
 * ����������
 * ���ڰ���
 * ���ڣ�2015��5��13��
 * �����ˣ�Administrator
 *
 * 
 */

/**	
 *	<dl>
 * 		<dt>��Ŀ���ƣ�MyWebServer</dt>
 * 		<dd>�����ƣ�Server</dd>
 * 		<dd>����������</dd>
 * 		<dd>����ʱ�䣺2015��5��13�� ����7:53:58</dd>
 * 		<dd>�����ˣ�Administrator</dd>
 * 		<dd>��ע����</dd>
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
