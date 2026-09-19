<?php
  /**
  * Requires the "PHP Email Form" library
  * The "PHP Email Form" library is available only in the pro version of the template
  * The library should be uploaded to: vendor/php-email-form/php-email-form.php
  * For more info and help: https://bootstrapmade.com/php-email-form/
  */

  // Replace contact@example.com with your real receiving email address
  $receiving_email_address = 'hr@alahmarigroup.com.sa';

  if( file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php' )) {
    include( $php_email_form );
  } else {
    die( 'Unable to load the "PHP Email Form" Library!');
  }

  // Check if form data is submitted
  if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    die('Error: Invalid request method.');
  }
  
  // Validate required fields
  if (empty($_POST['name']) || empty($_POST['email']) || empty($_POST['message'])) {
    die('Error: All fields are required.');
  }
  
  // Validate email format
  if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    die('Error: Invalid email address.');
  }
  
  $contact = new PHP_Email_Form;
  $contact->ajax = true;
  
  $contact->to = $receiving_email_address;
  $contact->from_name = htmlspecialchars(strip_tags($_POST['name']));
  $contact->from_email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
  $contact->subject = !empty($_POST['subject']) ? htmlspecialchars(strip_tags($_POST['subject'])) : 'Contact Form Submission';

  // Uncomment below code if you want to use SMTP to send emails. You need to enter your correct SMTP credentials
  /*
  $contact->smtp = array(
    'host' => 'example.com',
    'username' => 'example',
    'password' => 'pass',
    'port' => '587'
  );
  */

  $contact->add_message( htmlspecialchars(strip_tags($_POST['name'])), 'From');
  $contact->add_message( filter_var($_POST['email'], FILTER_SANITIZE_EMAIL), 'Email');
  $contact->add_message( htmlspecialchars(strip_tags($_POST['message'])), 'Message', 10);

  echo $contact->send();
?>
