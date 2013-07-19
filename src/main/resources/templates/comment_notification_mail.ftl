<html>
<body style="font-family:arial, sans-serif; font-size:12px;">
	<img style="margin-bottom:30px;" src="${logoUrl}" />
	
	<p>	
		${localization.getMessage("notification_mail.welcome", [watcher.getName()])}
	</p>
	
	<p>
		<#assign commentId = emailAction.what.id?c >
		<#assign url = linkerHelper.mainThreadLink(emailAction.getMainThread()) + "#comment-" + commentId>
		${localization.getMessage("notification_mail.where", [url, emailAction.getMainThread().getTitle()])}
	</p>
	
	<p>
		${localization.getMessage("notification_mail.comment", 
			[emailAction.getWhat().getAuthor().getName(), 
			localization.getMessage(emailAction.getWhere().getTypeNameKey()), 
			emailAction.getWhere().getAuthor().getName(),
			sanitizer.sanitize(emailAction.getWhat().getTrimmedContent())])}
	</p>
	
	<hr />
	<span style="display:block; color: #aaa;">
		${localization.getMessage("notification_mail.footer_message")}
	</span>
</body>
</html>

