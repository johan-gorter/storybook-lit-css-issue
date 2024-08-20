import { property, customElement } from 'lit/decorators.js';
import { html, LitElement } from 'lit';
import styles from './button.css?lit-css';

export interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}
/**
 * Primary UI component for user interaction
 */
@customElement('storybook-button')
export class Button extends LitElement {
  static styles = [styles];

  @property({ type: Boolean, reflect: true })
  primary = false;

  render() {
  return html`
      <button
        type="button"
      >
        Label
      </button>
    `;
  }
};
