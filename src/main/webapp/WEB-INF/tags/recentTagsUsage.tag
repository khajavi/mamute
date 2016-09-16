<%@ tag language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="tags" tagdir="/WEB-INF/tags" %>
<%@attribute name="tagsUsage" type="java.util.List" required="true" %>
<%@ taglib prefix="fa" uri="FaUtils" %>

<div class="subheader">
	<h3 class="title page-title">${t['tags.recent']}</h3>
</div>
<ol class="tags-usage">
	<c:forEach items="${tagsUsage}" var="tagUsage">
		<li class="tags-item">
		    <tags:tag tag="${tagUsage.tag}"/>
		    <span class="x"> x </span>
		    <span class="usage">${fa:toFa( tagUsage.usage )}</span>
		</li>
	</c:forEach>
</ol>