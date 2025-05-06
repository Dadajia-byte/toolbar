class Navigation {
  private historyStack: string[] = [];
  private currentIndex: number = -1;
  private isManualNavigation: boolean = false;

  constructor() {};

  public push(url: string): void {
    if (this.currentIndex < this.historyStack.length - 1) {
      this.historyStack.splice(this.currentIndex + 1);
    }
    this.historyStack.push(url);
    this.currentIndex++;
  }

  public back(): string | null {
    if (this.currentIndex > 0) {
      this.isManualNavigation = true;
      this.currentIndex--;
      return this.historyStack[this.currentIndex];
    }
    return null;
  }

  public forward(): string | null {
    if (this.currentIndex < this.historyStack.length - 1) {
      this.isManualNavigation = true;
      this.currentIndex++;
      return this.historyStack[this.currentIndex];
    }
    return null;
  }

  public reload(): string | null {
    if (this.currentIndex >= 0) {
      this.isManualNavigation = true;
      return this.historyStack[this.currentIndex];
    }
    return null;
  }

  public getCurrentUrl(): string | null {
    if (this.currentIndex >= 0) {
      return this.historyStack[this.currentIndex];
    }
    return null;
  }

  public clear(): void {
    this.historyStack = [];
    this.currentIndex = -1;
  }

  public canGoBack(): boolean {
    return this.currentIndex > 0;
  }

  public canGoForward(): boolean {
    return this.currentIndex < this.historyStack.length - 1;
  }

  public getIsManualNavigation(): boolean {
    return this.isManualNavigation;
  }

  public resetManualNavigation(): void {
    this.isManualNavigation = false;
  }
}

export default Navigation;