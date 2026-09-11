/**
 * OPERAVA Global Solutions — Unified Form Processing & Client Submission Handler
 * Connects frontend forms with backend APIs (/api/contact, /api/talent, /api/resume, /api/referral),
 * provides automatic CSRF token injection, form draft restoration, accessible feedback states,
 * and graceful fallback.
 */
(function(window) {
  'use strict';

  function getCsrfToken() {
    if (window.OperavaCookies) {
      var token = window.OperavaCookies.get('operava_csrf');
      if (token) return Promise.resolve(token);
    }
    // Fetch fresh session token if missing
    return fetch('/api/session', { credentials: 'same-origin' })
      .then(function(res) { return res.json(); })
      .then(function(data) {
        return (data && data.session && data.session.csrfToken) ? data.session.csrfToken : '';
      })
      .catch(function() {
        return '';
      });
  }

  function initFormHandlers() {
    var form = document.querySelector('form.form');
    if (!form) return;

    var path = window.location.pathname.toLowerCase();
    var isContact = path.includes('contact') || form.action.includes('contact') || form.querySelector('input[name="subject"]');
    var isTalent = path.includes('talent') || form.querySelector('select[name="headcount"]');
    var isResume = path.includes('resume') || form.querySelector('input[name="skills"]');
    var isReferral = path.includes('referral') || form.querySelector('input[name="referrer_name"]');

    var endpoint = null;
    var formKey = null;

    if (isContact) {
      endpoint = '/api/contact';
      formKey = 'draft_contact';
    } else if (isTalent) {
      endpoint = '/api/talent';
      formKey = 'draft_talent';
    } else if (isResume) {
      endpoint = '/api/resume';
      formKey = 'draft_resume';
    } else if (isReferral) {
      endpoint = '/api/referral';
      formKey = 'draft_referral';
    }

    if (!endpoint) return;

    // Restore draft if available
    if (formKey && window.OperavaStorage) {
      var draft = window.OperavaStorage.get(formKey, null, 'session');
      if (draft && typeof draft === 'object') {
        Object.keys(draft).forEach(function(fieldName) {
          var input = form.elements[fieldName];
          if (input && !input.value) {
            input.value = draft[fieldName];
          }
        });
      }

      // Auto-save on input
      form.addEventListener('input', function(e) {
        if (!e.target || !e.target.name) return;
        var currentData = {};
        var elements = form.elements;
        for (var i = 0; i < elements.length; i++) {
          var el = elements[i];
          if (el.name && el.type !== 'password' && el.type !== 'file') {
            currentData[el.name] = el.value;
          }
        }
        window.OperavaStorage.set(formKey, currentData, 3600, 'session');
      });
    }

    // Submit handler
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      var submitBtn = form.querySelector('button[type="submit"]');
      var originalBtnText = submitBtn ? submitBtn.innerText : 'Submit';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Submitting Request...';
      }

      // Clear any prior alert
      var priorAlert = form.querySelector('.form-alert-msg');
      if (priorAlert) priorAlert.remove();

      // Collect payload according to endpoint
      var payload = {};
      if (isContact) {
        payload = {
          name: (form.elements['name'] ? form.elements['name'].value : '').trim(),
          email: (form.elements['email'] ? form.elements['email'].value : '').trim(),
          phone: (form.elements['phone'] ? form.elements['phone'].value : '').trim(),
          company: (form.elements['company'] ? form.elements['company'].value : '').trim(),
          department: (form.elements['department'] ? form.elements['department'].value : '').trim(),
          subject: (form.elements['subject'] ? form.elements['subject'].value : '').trim(),
          message: (form.elements['body'] ? form.elements['body'].value : '').trim()
        };
      } else if (isTalent) {
        payload = {
          company: (form.elements['company'] ? form.elements['company'].value : '').trim(),
          contactName: (form.elements['name'] ? form.elements['name'].value : (form.elements['contact'] ? form.elements['contact'].value : 'Corporate Partner')).trim(),
          email: (form.elements['email'] ? form.elements['email'].value : '').trim(),
          phone: (form.elements['phone'] ? form.elements['phone'].value : '').trim(),
          rolesNeeded: (form.elements['role'] ? form.elements['role'].value : '').trim(),
          podSize: (form.elements['headcount'] ? form.elements['headcount'].value : '').trim(),
          engagementType: (form.elements['type'] ? form.elements['type'].value : '').trim(),
          timeline: (form.elements['timeline'] ? form.elements['timeline'].value : '').trim(),
          timezone: (form.elements['timezone'] ? form.elements['timezone'].value : '').trim(),
          notes: (form.elements['body'] ? form.elements['body'].value : '').trim()
        };
      } else if (isResume) {
        payload = {
          firstName: (form.elements['first_name'] ? form.elements['first_name'].value : '').trim(),
          lastName: (form.elements['last_name'] ? form.elements['last_name'].value : '').trim(),
          email: (form.elements['email'] ? form.elements['email'].value : '').trim(),
          phone: (form.elements['phone'] ? form.elements['phone'].value : '').trim(),
          location: (form.elements['location'] ? form.elements['location'].value : '').trim(),
          targetRole: (form.elements['position'] ? form.elements['position'].value : '').trim(),
          experienceYears: (form.elements['experience'] ? form.elements['experience'].value : '').trim(),
          availability: (form.elements['availability'] ? form.elements['availability'].value : '').trim(),
          skills: (form.elements['skills'] ? form.elements['skills'].value : '').trim(),
          linkedinUrl: (form.elements['portfolio'] ? form.elements['portfolio'].value : '').trim(),
          summary: (form.elements['body'] ? form.elements['body'].value : '').trim()
        };
      } else if (isReferral) {
        payload = {
          referrerName: (form.elements['referrer_name'] ? form.elements['referrer_name'].value : '').trim(),
          referrerEmail: (form.elements['referrer_email'] ? form.elements['referrer_email'].value : '').trim(),
          referrerPhone: (form.elements['referrer_phone'] ? form.elements['referrer_phone'].value : '').trim(),
          referralType: (form.elements['type'] ? form.elements['type'].value : 'Talent Referral').trim(),
          candidateName: (form.elements['referral_name'] ? form.elements['referral_name'].value : '').trim(),
          candidateEmail: (form.elements['referral_email'] ? form.elements['referral_email'].value : '').trim(),
          referralLink: (form.elements['referral_link'] ? form.elements['referral_link'].value : '').trim(),
          relationship: (form.elements['relationship'] ? form.elements['relationship'].value : '').trim(),
          notes: (form.elements['body'] ? form.elements['body'].value : '').trim()
        };
      }

      getCsrfToken().then(function(token) {
        var headers = {
          'Content-Type': 'application/json'
        };
        if (token) {
          headers['x-csrf-token'] = token;
        }

        return fetch(endpoint, {
          method: 'POST',
          headers: headers,
          credentials: 'same-origin',
          body: JSON.stringify(payload)
        });
      })
      .then(function(res) {
        return res.json().then(function(data) {
          return { ok: res.ok, status: res.status, data: data };
        });
      })
      .then(function(result) {
        if (result.ok && result.data && result.data.ok) {
          // Clear saved draft
          if (formKey && window.OperavaStorage) {
            window.OperavaStorage.remove(formKey, 'session');
          }

          var refId = (result.data.data && (result.data.data.referenceNumber || result.data.data.applicationId || result.data.data.referralId)) || 'OPV-' + Date.now();
          var successMessage = result.data.message || 'Your submission has been recorded securely.';

          // Render high-contrast confirmation card replacing the form
          var parentDiv = form.parentElement;
          var confirmCard = document.createElement('div');
          confirmCard.className = 'operava-submission-success';
          confirmCard.style.cssText = 'background:#06101f;color:#fff;padding:2.5rem;border-radius:4px;border:1px solid #1a2942;margin-top:1rem;';
          confirmCard.innerHTML = [
            '<div style="display:inline-block;background:#4B20C9;color:#fff;padding:0.25rem 0.75rem;font-size:0.75rem;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;margin-bottom:1rem;border-radius:2px;">Confirmed</div>',
            '<h3 style="font-family:var(--fd, sans-serif);font-size:1.75rem;font-weight:700;margin-bottom:0.75rem;color:#fff;">Submission Received</h3>',
            '<p style="color:#a0aec0;font-size:0.95rem;line-height:1.6;margin-bottom:1.5rem;">' + successMessage + '</p>',
            '<div style="background:#0a1628;border:1px solid #2d3748;padding:1rem 1.25rem;border-radius:4px;margin-bottom:1.75rem;">',
            '  <div style="font-size:0.75rem;color:#718096;text-transform:uppercase;letter-spacing:0.05em;">Official Reference Tracking ID</div>',
            '  <div style="font-family:monospace;font-size:1.15rem;font-weight:700;color:#9F7AEA;margin-top:0.25rem;">' + refId + '</div>',
            '</div>',
            '<button type="button" class="btn" id="btn-submit-another" style="background:#4B20C9;color:#fff;border:none;padding:0.75rem 1.5rem;font-size:0.875rem;font-weight:600;cursor:pointer;border-radius:2px;">Submit Another Inquiry</button>'
          ].join('\n');

          form.style.display = 'none';
          parentDiv.appendChild(confirmCard);

          var anotherBtn = document.getElementById('btn-submit-another');
          if (anotherBtn) {
            anotherBtn.addEventListener('click', function() {
              confirmCard.remove();
              form.reset();
              form.style.display = '';
              if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerText = originalBtnText;
              }
            });
          }
        } else {
          var errMsg = (result.data && result.data.error) ? result.data.error : 'Unable to complete submission. Please check your details and try again.';
          var alertEl = document.createElement('div');
          alertEl.className = 'form-alert-msg';
          alertEl.style.cssText = 'background:#ffebee;color:#c62828;border:1px solid #ef9a9a;padding:0.875rem 1rem;border-radius:4px;font-size:0.875rem;margin-bottom:1.25rem;';
          alertEl.innerText = errMsg;
          form.insertBefore(alertEl, form.firstChild);

          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerText = originalBtnText;
          }
        }
      })
      .catch(function(err) {
        console.warn('[OPERAVA Forms] Network submit failed, offering mailto fallback:', err);
        var alertEl = document.createElement('div');
        alertEl.className = 'form-alert-msg';
        alertEl.style.cssText = 'background:#fff3e0;color:#e65100;border:1px solid #ffe0b2;padding:0.875rem 1rem;border-radius:4px;font-size:0.875rem;margin-bottom:1.25rem;';
        alertEl.innerHTML = 'Direct server connection was interrupted. You can also send your inquiry directly via email to <a href="mailto:hello@operavaglobal.com" style="text-decoration:underline;font-weight:600;color:inherit;">hello@operavaglobal.com</a>.';
        form.insertBefore(alertEl, form.firstChild);

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerText = originalBtnText;
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFormHandlers);
  } else {
    initFormHandlers();
  }
})(typeof window !== 'undefined' ? window : this);
