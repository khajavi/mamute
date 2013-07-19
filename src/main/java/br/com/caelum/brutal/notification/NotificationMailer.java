package br.com.caelum.brutal.notification;

import static org.joda.time.format.DateTimeFormat.forPattern;

import java.util.Locale;

import org.apache.commons.mail.Email;
import org.apache.commons.mail.EmailException;
import org.apache.log4j.Logger;
import org.joda.time.format.DateTimeFormatter;
import org.owasp.html.HtmlPolicyBuilder;
import org.owasp.html.PolicyFactory;

import br.com.caelum.brutal.controllers.ListController;
import br.com.caelum.brutal.controllers.NewsController;
import br.com.caelum.brutal.controllers.QuestionController;
import br.com.caelum.brutal.controllers.UserProfileController;
import br.com.caelum.brutal.mail.action.EmailAction;
import br.com.caelum.brutal.model.News;
import br.com.caelum.brutal.model.Question;
import br.com.caelum.brutal.model.Tag;
import br.com.caelum.brutal.model.User;
import br.com.caelum.brutal.model.interfaces.Watchable;
import br.com.caelum.brutal.vraptor.Linker;
import br.com.caelum.vraptor.core.Localization;
import br.com.caelum.vraptor.environment.Environment;
import br.com.caelum.vraptor.ioc.Component;
import br.com.caelum.vraptor.simplemail.Mailer;
import br.com.caelum.vraptor.simplemail.template.TemplateMailer;

@Component
public class NotificationMailer {
    
    private final Mailer mailer;
    private final TemplateMailer templates;
    private final Localization localization;
    private final Linker linker;
    private static final Logger LOG = Logger.getLogger(NotificationMailer.class);
    private static final PolicyFactory POLICY = new HtmlPolicyBuilder().toFactory();
	private final Environment env;

    public NotificationMailer(Mailer mailer, TemplateMailer templates, 
    		Localization localization, Linker linker, Environment env) {
        this.mailer = mailer;
        this.templates = templates;
        this.localization = localization;
        this.linker = linker;
		this.env = env;
    }

	public void send(NotificationMail notificationMail) {
		User to = notificationMail.getTo();
		Email email = buildEmail(notificationMail);
		email.setCharset("utf-8");
		try {
			mailer.send(email);
		} catch (EmailException e) {
			LOG.error("Could not send notifications mail to: " + to.getEmail(), e);
		}
	}

	public Email buildEmail(NotificationMail notificationMail) {
		DateTimeFormatter dateFormat = forPattern("MMM, dd").withLocale(new Locale("pt", "br"));
		EmailAction action = notificationMail.getAction();
		User to = notificationMail.getTo();
		Email email = templates.template(notificationMail.getEmailTemplate())
				.with("emailAction", action)
				.with("dateFormat", dateFormat)
				.with("sanitizer", POLICY)
				.with("localization", localization)
				.with("watcher", to)
				.with("linkerHelper", new LinkToHelper(linker))
				.with("logoUrl", env.get("mail_logo_url"))
				.to(to.getName(), to.getEmail())
				.setSubject(localization.getMessage("answer_notification_mail", action.getMainThread().getType()));
		return email;
	}
    
	public static class LinkToHelper {
        private Linker linker;

        public LinkToHelper(Linker linker) {
            this.linker = linker;
        }
        
        public String mainThreadLink(Watchable watchable) {
			if(watchable.getType().isAssignableFrom(News.class)) {
				News news = (News) watchable;
        		linker.linkTo(NewsController.class).showNews(news, news.getSluggedTitle());
			}else{
				Question question = (Question) watchable;
        		linker.linkTo(QuestionController.class).showQuestion(question, question.getSluggedTitle());
        	}
    		return linker.get();
        }
        
        public String tagLink(Tag t) {
        	linker.linkTo(ListController.class).withTag(t.getName(), 1);
        	return linker.get();
        }
        public String userLink(User u) {
        	linker.linkTo(UserProfileController.class).showProfile(u, u.getSluggedName());
        	return linker.get();
        }
        public String unsubscribeLink(User user) {
        	linker.linkTo(UserProfileController.class).unsubscribe(user, user.getUnsubscribeHash());
        	return linker.get();
        }
        
    }

}
