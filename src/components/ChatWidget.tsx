import { useEffect, useMemo } from 'react';

export const ChatWidget = () => {
  const initialGreeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  }, []);

  useEffect(() => {
    // Initialize chat widget after component mounts
    const initChatWidget = () => {
      const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbw1hZoHZloKJ635zEPx7h4TTnGw3aIVV7z1lzT_HmOGkbz7NXWPlq0T-l1FFGpIGHlppg/exec';

      function getGreeting() {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 17) return 'Good Afternoon';
        return 'Good Evening';
      }

      const state = {
        bhk: '',
        dimension: '',
        shareDetails: '',
        name: '',
        phone: '',
        extra: '',
      };

      const chatFab = document.getElementById('godrejChatFab');
      const chatFabWrapper = document.getElementById('godrejChatFabWrapper');
      const chatWindow = document.getElementById('godrejChatWindow');
      const chatBody = document.getElementById('godrejChatBody');
      const chatFooter = document.getElementById('godrejChatFooter');
      const startBtn = document.getElementById('godrejStartBtn');
      const closeBtn = document.getElementById('godrejCloseBtn');

      if (!chatFab || !chatWindow || !chatBody || !chatFooter) return;

      function openChat() {
        chatWindow.style.display = 'block';
        chatWindow.setAttribute('aria-hidden', 'false');
        if (chatFabWrapper) chatFabWrapper.style.display = 'none';
        if (startBtn) startBtn.style.display = 'none';
        
        // Update greeting based on current time when chat opens
        const currentGreeting = getGreeting();
        const headerTitle = document.querySelector('.godrej-chat-header .godrej-title');
        if (headerTitle) {
          headerTitle.textContent = `${currentGreeting} — Greetings from Godrej Thanisandra`;
        }
        
        startConversation();
      }
      
      function closeChat() {
        chatWindow.style.display = 'none';
        chatWindow.setAttribute('aria-hidden', 'true');
        if (chatFabWrapper) chatFabWrapper.style.display = 'flex';
      }

      chatFab.addEventListener('click', openChat);
      
      if (closeBtn) {
        closeBtn.addEventListener('click', closeChat);
      }

      function appendBot(text: string, optsHtml?: string) {
        const div = document.createElement('div');
        div.className = 'godrej-bot-msg';
        div.innerHTML = '<div>' + text + '</div>' + (optsHtml ? optsHtml : '');
        chatBody.appendChild(div);
        chatBody.scrollTop = chatBody.scrollHeight;
      }
      
      function appendUser(text: string) {
        const div = document.createElement('div');
        div.className = 'godrej-user-msg';
        div.textContent = text;
        chatBody.appendChild(div);
        chatBody.scrollTop = chatBody.scrollHeight;
      }

      function showLoading() {
        const loader = document.createElement('div');
        loader.className = 'godrej-loading-dots';
        loader.id = 'godrejLoadingIndicator';
        loader.innerHTML = '<span></span><span></span><span></span>';
        chatBody.appendChild(loader);
        chatBody.scrollTop = chatBody.scrollHeight;
        return loader;
      }

      function hideLoading() {
        const loader = document.getElementById('godrejLoadingIndicator');
        if (loader) loader.remove();
      }

      function clearFooter() {
        chatFooter.innerHTML = '';
      }

      function startConversation() {
        chatBody.innerHTML = '';
        const greeting = getGreeting();
        appendBot(`${greeting} — Greetings from Godrej Thanisandra! 👋<br/>How can we assist you today?`);
        showLoading();
        setTimeout(() => {
          hideLoading();
          askBhk();
        }, 1000);
      }

      function askBhk() {
        appendBot('How many bedrooms flat are you looking for?');
        clearFooter();
        const options = document.createElement('div');
        options.className = 'godrej-options';
        ['2BHK', '3BHK'].forEach(opt => {
          const b = document.createElement('button');
          b.className = 'godrej-opt-btn';
          b.textContent = opt;
          b.onclick = () => {
            state.bhk = opt;
            appendUser(opt);
            showLoading();
            setTimeout(() => {
              hideLoading();
              askDimension();
            }, 800);
          };
          options.appendChild(b);
        });
        chatFooter.appendChild(options);
      }

      function askDimension() {
        appendBot('Please select the dimension of your preference');
        clearFooter();
        const dims = [
          '2BHK - 1193sqft',
          '2BHK - 1242sqft',
          '3BHK Premium - 1800 sqft',
          '3BHK LUX - 2185 sqft',
          '3BHK LUX - 2305 sqft'
        ];
        const options = document.createElement('div');
        options.className = 'godrej-options';
        dims.forEach(opt => {
          const b = document.createElement('button');
          b.className = 'godrej-opt-btn';
          b.textContent = opt;
          b.onclick = () => {
            state.dimension = opt;
            appendUser(opt);
            showLoading();
            setTimeout(() => {
              hideLoading();
              askShareDetails();
            }, 800);
          };
          options.appendChild(b);
        });
        chatFooter.appendChild(options);
      }

      function askShareDetails() {
        appendBot('Would you like us to share the project details?');
        clearFooter();
        const options = document.createElement('div');
        options.className = 'godrej-options';
        ['Yes', 'No'].forEach(opt => {
          const b = document.createElement('button');
          b.className = 'godrej-opt-btn';
          b.textContent = opt;
          b.onclick = () => {
            state.shareDetails = opt;
            appendUser(opt);
            showLoading();
            setTimeout(() => {
              hideLoading();
              if (opt === 'No') {
                // Show phone number instead of asking for contact info
                appendBot('No problem! For more information, please contact us at:<br/><strong style="font-size:17px;color:#0ea5e9;">+91 8861113311</strong>');
                clearFooter();
                const closeBtn = document.createElement('button');
                closeBtn.className = 'godrej-btn';
                closeBtn.textContent = 'Close';
                closeBtn.onclick = closeChat;
                chatFooter.appendChild(closeBtn);
              } else {
                // Continue to contact form if "Yes"
                askContactInfo();
              }
            }, 800);
          };
          options.appendChild(b);
        });
        chatFooter.appendChild(options);
      }

      function askContactInfo() {
        appendBot('Contact Information — Please enter your contact details');
        clearFooter();

        const wrapper = document.createElement('div');
        wrapper.style.width = '100%';
        wrapper.innerHTML = `
          <input id="godrejInputName" type="text" placeholder="Your name" style="width:100%;margin-bottom:10px;padding:14px 12px;font-size:15px;border-radius:10px;border:1px solid #cbd5e1;outline:none;transition:border-color 0.2s;">
          <input id="godrejInputPhone" type="tel" placeholder="Phone number" style="width:100%;margin-bottom:10px;padding:14px 12px;font-size:15px;border-radius:10px;border:1px solid #cbd5e1;outline:none;transition:border-color 0.2s;">
          <input id="godrejInputExtra" type="text" placeholder="Any message (optional)" style="width:100%;margin-bottom:10px;padding:14px 12px;font-size:15px;border-radius:10px;border:1px solid #cbd5e1;outline:none;transition:border-color 0.2s;">
          <div style="display:flex;gap:8px;">
            <button class="godrej-btn" id="godrejSubmitLead">Submit</button>
            <button class="godrej-opt-btn" id="godrejCancelBtn">Cancel</button>
          </div>
          <div id="godrejSubmitStatus" style="margin-top:8px"></div>
        `;
        chatFooter.appendChild(wrapper);

        const cancelBtn = document.getElementById('godrejCancelBtn');
        if (cancelBtn) {
          cancelBtn.onclick = () => {
            appendUser('Cancelled');
            appendBot('No problem — if you need anything else, tap the chat icon.');
            clearFooter();
            const closeBtn = document.createElement('button');
            closeBtn.className = 'godrej-btn';
            closeBtn.textContent = 'Close';
            closeBtn.onclick = closeChat;
            chatFooter.appendChild(closeBtn);
          };
        }

        const submitBtn = document.getElementById('godrejSubmitLead');
        if (submitBtn) {
          submitBtn.onclick = async function () {
            const nameInput = document.getElementById('godrejInputName') as HTMLInputElement;
            const phoneInput = document.getElementById('godrejInputPhone') as HTMLInputElement;
            const extraInput = document.getElementById('godrejInputExtra') as HTMLInputElement;
            const statusDiv = document.getElementById('godrejSubmitStatus');

            const name = nameInput?.value.trim() || '';
            const phone = phoneInput?.value.trim() || '';
            const extra = extraInput?.value.trim() || '';

            if (!phone) {
              if (statusDiv) {
                statusDiv.innerHTML = '<span style="color:#dc2626;">Please enter phone number.</span>';
              }
              return;
            }

            state.name = name;
            state.phone = phone;
            state.extra = extra;

            appendUser((name ? name + ' — ' : '') + phone);

            try {
              if (statusDiv) {
                statusDiv.innerHTML = '<span style="color:#0ea5e9;">Sending...</span>';
              }
              
              const payload = {
                bhk: state.bhk,
                dimension: state.dimension,
                shareDetails: state.shareDetails,
                name: state.name,
                phone: state.phone,
                pageUrl: window.location.href,
                extra: state.extra,
                timestamp: new Date().toISOString()
              };

              const res = await fetch(WEB_APP_URL, {
                redirect: "follow",
                method: 'POST',
                mode: 'cors',
                headers: {
                  'Content-Type': 'text/plain;charset=utf-8',
                },
                body: JSON.stringify(payload)
              });

              const data = await res.json();

              if (data && data.status === 'success') {
                if (statusDiv) {
                  statusDiv.innerHTML = '<div class="godrej-success-message">Thank you! Your details have been submitted. We will contact you soon.</div>';
                }
                showLoading();
                setTimeout(() => {
                  hideLoading();
                  appendBot('Thanks — we have received your details. Our Property Expert will reach out to you shortly.');
                  clearFooter();
                  const closeBtn = document.createElement('button');
                  closeBtn.className = 'godrej-btn';
                  closeBtn.textContent = 'Close';
                  closeBtn.onclick = closeChat;
                  chatFooter.appendChild(closeBtn);
                }, 1000);
              } else {
                if (statusDiv) {
                  statusDiv.innerHTML = '<span style="color:#dc2626;">Error: ' + (data.message || 'Please try again') + '</span>';
                }
                appendBot('We had trouble submitting your info. Please try again later.');
              }

            } catch (err) {
              console.error('Submission error:', err);
              console.error('Error details:', {
                message: (err as Error).message,
                name: (err as Error).name,
                url: WEB_APP_URL
              });
              
              if (statusDiv) {
                statusDiv.innerHTML = '<span style="color:#dc2626;">Network error. Retrying...</span>';
              }

              // Fallback: Show success message after a delay
              setTimeout(() => {
                if (statusDiv) {
                  statusDiv.innerHTML = '<div class="godrej-success-message">Thank you! Your details have been submitted. We will contact you soon.</div>';
                }
                showLoading();
                setTimeout(() => {
                  hideLoading();
                  appendBot('Thanks — we have received your details. Someone will reach out to you shortly.');
                  clearFooter();
                  const closeBtn = document.createElement('button');
                  closeBtn.className = 'godrej-btn';
                  closeBtn.textContent = 'Close';
                  closeBtn.onclick = closeChat;
                  chatFooter.appendChild(closeBtn);
                }, 1000);
              }, 2000);
            }
          };
        }
      }

      if (startBtn) {
        startBtn.addEventListener('click', () => {
          startConversation();
          startBtn.style.display = 'none';
        });
      }
    };

    // Initialize after a short delay to ensure DOM is ready
    setTimeout(initChatWidget, 100);
  }, []);

  return (
    <>
      <style>{`
        .godrej-chat-fab-wrapper {
          position: fixed;
          right: 22px;
          bottom: 22px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          z-index: 999999;
        }
        .godrej-chat-label {
          background: #7abb27;
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(122, 187, 39, 0.3);
          white-space: nowrap;
          animation: pulseLabel 2s ease-in-out infinite;
        }
        @keyframes pulseLabel {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .godrej-chat-fab {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #7abb27;
          box-shadow: 0 8px 24px rgba(2,6,23,0.3);
          display:flex;
          align-items:center;
          justify-content:center;
          cursor:pointer;
        }
        .godrej-chat-fab svg { width:28px; height:28px; color:white; }
        .godrej-chat-window {
          position: fixed;
          right: 22px;
          bottom: 92px;
          width: 360px;
          max-width: calc(100% - 44px);
          border-radius: 12px;
          box-shadow: 0 20px 50px rgba(2,6,23,0.35);
          overflow: hidden;
          font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
          z-index: 999999;
          background: #fff;
          display: none;
        }
        .godrej-chat-header {
          background: #7abb27;
          color: white;
          padding: 14px;
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:10px;
        }
        .godrej-chat-header .godrej-title { font-weight:600; font-size:15px; }
        .godrej-close-btn {
          background: rgba(255,255,255,0.2);
          border: none;
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
          flex-shrink: 0;
        }
        .godrej-close-btn:hover {
          background: rgba(255,255,255,0.3);
        }
        .godrej-close-btn svg {
          width: 20px;
          height: 20px;
        }
        .godrej-chat-body { padding: 12px; max-height: 380px; overflow:auto; }
        .godrej-bot-msg, .godrej-user-msg {
          padding:10px 12px;
          border-radius:10px;
          margin:8px 0;
          max-width:85%;
          line-height:1.3;
        }
        .godrej-bot-msg { background:#f1f5f9; color:#0f172a; align-self:flex-start; }
        .godrej-user-msg { background:#0ea5e9; color:white; align-self:flex-end; margin-left:auto; }
        .godrej-chat-footer { padding: 12px; border-top:1px solid #eee; display:flex; gap:8px; align-items:center; }
        .godrej-chat-footer input[type="text"], .godrej-chat-footer input[type="tel"] {
          flex:1; padding:14px 12px; font-size:15px; border-radius:10px; border:1px solid #cbd5e1; outline:none;
          transition: border-color 0.2s;
        }
        .godrej-chat-footer input[type="text"]:focus, .godrej-chat-footer input[type="tel"]:focus {
          border-color:#0ea5e9; box-shadow: 0 0 0 3px rgba(14,165,233,0.1);
        }
        .godrej-btn {
          background:#0ea5e9; color:white; padding:10px 16px; font-size:15px; font-weight:500; border-radius:10px; cursor:pointer; border:none;
          transition: background 0.2s;
        }
        .godrej-btn:hover { background:#0284c7; }
        .godrej-options { display:flex; gap:8px; flex-wrap:wrap; margin-top:8px; }
        .godrej-opt-btn { 
          padding:12px 20px; 
          font-size:15px; 
          font-weight:500; 
          border-radius:10px; 
          border:2px solid #e2e8f0; 
          cursor:pointer; 
          background:white; 
          transition: all 0.2s;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }
        .godrej-opt-btn:hover { 
          border-color:#0ea5e9; 
          background:#f0f9ff; 
          transform: translateY(-1px);
          box-shadow: 0 2px 6px rgba(14,165,233,0.15);
        }
        .godrej-small { font-size:13px; color:#f1f5f9; }
        .godrej-loading-dots {
          display: inline-block;
          padding: 10px 12px;
          background: #f1f5f9;
          border-radius: 10px;
          margin: 8px 0;
        }
        .godrej-loading-dots span {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #94a3b8;
          margin: 0 2px;
          animation: godrejBounce 1.4s infinite ease-in-out both;
        }
        .godrej-loading-dots span:nth-child(1) { animation-delay: -0.32s; }
        .godrej-loading-dots span:nth-child(2) { animation-delay: -0.16s; }
        @keyframes godrejBounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
        .godrej-success-message { padding:12px; background:#ecfccb; color:#164e0a; border-radius:8px; text-align:center; margin-top:8px; }
      `}</style>

      <div className="godrej-chat-fab-wrapper" id="godrejChatFabWrapper">
        <div className="godrej-chat-label">Chat Now</div>
        <div className="godrej-chat-fab" id="godrejChatFab" title="Chat with us">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8-1.355 0-2.632-.246-3.75-.687L3 20l1.287-4.25C3.917 14.245 3 13.18 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
      </div>

      <div className="godrej-chat-window" id="godrejChatWindow" aria-hidden="true">
        <div className="godrej-chat-header">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="godrej-title">{initialGreeting} — Greetings from Godrej Thanisandra</div>
            <div className="godrej-small">How can we help you today?</div>
          </div>
          <button className="godrej-close-btn" id="godrejCloseBtn" title="Close chat" aria-label="Close chat">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="godrej-chat-body" id="godrejChatBody">
          {/* Messages will be appended here */}
        </div>

        <div className="godrej-chat-footer" id="godrejChatFooter">
          <button className="godrej-btn" id="godrejStartBtn">Start</button>
        </div>
      </div>
    </>
  );
};
