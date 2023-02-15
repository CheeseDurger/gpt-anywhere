import { config } from "../../01-shared/config";

export class Spinner {

  /**
   * Get html string for a loading spinner
   * @param spinnerId - id of the spinner element
   * @param styleId - id of the style element
   * @returns html for the spinner element and its style
   */
  public htmlString(spinnerId: string, styleId: string): string {
    return `<span id="${spinnerId}"></span>
    <style id="${styleId}">
      #${spinnerId} {
        position: fixed;
        top: 10vmin;
        right: 10vmin;
        height: 10vmin;
        width: 10vmin;
        border-radius: 50%;
        border: 1vmin solid ${config.ui.color.secondary};
        border-bottom-color: ${config.ui.color.primary};
        animation: ${spinnerId} 0.5s linear infinite;
      }

      @keyframes ${spinnerId} {
        0% { transform: rotate(0deg) }
        100% { transform: rotate(360deg) }
      }
    </style>`;
  };

};
