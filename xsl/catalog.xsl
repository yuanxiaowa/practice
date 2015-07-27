<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
		<html>
			<head>
				<title>Catalog</title>
			</head>
			<body>
				<h2>My CD Collection</h2>
				<xsl:apply-templates />
			</body>
		</html>
	</xsl:template>
	<xsl:template match="cd">
		<div>
			<xsl:apply-templates select="title" />
		</div>
	</xsl:template>
	<xsl:template match="title">
		-
	</xsl:template>
</xsl:stylesheet>