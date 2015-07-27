<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
		<html>
			<head>
				<title>tool</title>
			</head>
			<body>
				<form action="" method="post">
					<h2>Tool Information (edit):</h2>
					<table border="0">
						<xsl:for-each select="tool/field">
							<tr>
								<td>
									<xsl:value-of select="@id"></xsl:value-of>
								</td>
								<td>
									<input type="text">
										<xsl:attribute name="id">
											<xsl:value-of select="@id" />
										</xsl:attribute>
										<xsl:attribute name="name">
											<xsl:value-of select="@id" />
										</xsl:attribute>
										<xsl:attribute name="value">
											<xsl:value-of select="value" />
										</xsl:attribute>
									</input>
								</td>
							</tr>
						</xsl:for-each>
					</table>
					<input type="submit" id="btn_sub" value="submit"/>
					<input type="reset" value="reset"/>
				</form>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>