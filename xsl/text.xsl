<?xml version="1.0" encoding="utf-8"?>
<xsl:transform version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="HTML" version="4.0" encoding="utf-8" standalone="yes" />
	<xsl:template match="/">
		<html>
			<head>
				<title>
					<xsl:value-of select="article/title" />
				</title>
			</head>
			<body>
				<center>
					<b>
						<font face="Arial" size="3">
							<xsl:value-of select="article/title" />
						</font>
					</b>
					<b>
						<i>
							<font face="Arial" size="2" color="#f00">
								<xsl:value-of select="article/author" />
							</font>
						</i>
					</b>
					<table bgcolor="#036" width="300">
						<tr>
							<td>
								<font face="Arial" size="3" color="#fff">
									<xsl:value-of select="article/text" />
								</font>
							</td>
						</tr>
					</table>
					<xsl:for-each select="article/menu/item">
						<div>
							<xsl:value-of select="." />
						</div>
					</xsl:for-each>
				</center>
			</body>
		</html>
	</xsl:template>
</xsl:transform>