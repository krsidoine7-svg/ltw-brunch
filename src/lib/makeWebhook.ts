import { TicketRegistration } from './types';

const MAKE_WEBHOOK_URL = 'https://hook.eu2.make.com/u3bh8d1dirnkj93ciix96co74k24nb4k';

export async function sendToMakeWebhook(payload: TicketRegistration): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch(MAKE_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return { success: true, message: 'Inscription enregistrée et transmise à Make avec succès.' };
    } else {
      console.warn('Webhook Make response non-200:', response.statusText);
      return { success: true, message: 'Ticket généré avec succès en mode autonome.' };
    }
  } catch (error) {
    console.error('Erreur lors de la transmission au Webhook Make:', error);
    // Return success true so user ticket flow is never blocked
    return { success: true, message: 'Ticket généré localement avec succès.' };
  }
}
