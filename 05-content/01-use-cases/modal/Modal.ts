// @ts-ignore
import popupHtml from 'bundle-text:./modal.html';

// Unique ID for shadow root host for avoiding collision
const shadowRootHostId: string = "gpt-anywhere-shadow-root-7179470057";

export class Modal {
  private readonly host: HTMLElement;
  private readonly shadow: ShadowRoot;
  private readonly wrapper: HTMLElement;
  private readonly content: HTMLElement;
  private readonly cursor: HTMLElement;
  private readonly success: HTMLElement;
  private readonly animationMs: number = 400;

  constructor() {
    
    const existingShadowRoot: HTMLElement | null = document.getElementById(shadowRootHostId);

    // If modal already exists: get the existing modal
    // Else: create a new modal
    if (existingShadowRoot !== null && existingShadowRoot.shadowRoot !== null) {
      this.host = existingShadowRoot;
      this.shadow = existingShadowRoot.shadowRoot;
    } else {
      // Create the div that will host the shadow DOM
      this.host = document.createElement("div");
      this.host.setAttribute("id", shadowRootHostId);
      document.body.appendChild(this.host);

      // Create the shadow root
      this.shadow = this.host.attachShadow( { mode: 'open' } );

      // Append popup HTML to shadow root
      const documentFragment: DocumentFragment = document.createRange().createContextualFragment(popupHtml);
      this.shadow.appendChild(documentFragment);
    }

    this.wrapper = this.shadow.querySelector("#wrapper") ?? (() => {throw new Error("Error : wrapper element not found")})();
    this.content = this.shadow.querySelector("#completion") ?? (() => {throw new Error("Error : content element not found")})();
    this.cursor = this.shadow.querySelector("#cursor") ?? (() => {throw new Error("Error : cursor element not found")})();
    this.success = this.shadow.querySelector("#success") ?? (() => {throw new Error("Error : success element not found")})();
    
    this.shadow.querySelectorAll("#overlay, #close").forEach(element => {
      element.addEventListener('click', () => this.close());
    });
    
    this.shadow.querySelectorAll("#copy-and-close").forEach(element => {
      element.addEventListener('click', () => this.copyAndClose());
    });
  };

  /**
   * Opens an empty modal, or empty the existing modal
   * @returns this
   */
  public open(): Modal {
    this.content.innerText = "";
    this.wrapper.classList.add('modal-open');
    return this;
  };

  public addText(text: string): void {
    this.cursor.hidden = false;
    this.content.innerText += text;
  };

  private async copy(): Promise<void> {
    await navigator.clipboard.writeText(this.content.innerText);
    this.displaySuccess();
    setTimeout(this.hideSuccess, this.animationMs);
  };
  
  public close(): void {
    this.wrapper.classList.remove('modal-open');
    this.stopText();
    this.host.remove();
  };

  public copyAndClose(): void {
    this.copy();
    setTimeout(() => {
      this.close();
    }, this.animationMs + 100);
  };

  public stopText(): void {
    this.cursor.hidden = true;
  };

  private displaySuccess(): void {
    if (this.success?.hidden !== undefined) this.success.hidden = false;
  };
  
  private hideSuccess(): void {
    // success element might have been destroyed by close() method
    if (this.success?.hidden !== undefined) this.success.hidden = true;
  };

};
