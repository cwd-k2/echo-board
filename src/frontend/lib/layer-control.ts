class LayerControl {
  layerIdToZIndex: Map<string, number>;

  constructor() {
    this.layerIdToZIndex = new Map([
      [crypto.randomUUID(), 0], // ベース
    ]);
  }

  private get maxZIndex(): number {
    return [...this.layerIdToZIndex.values()].reduce(
      (a, b) => Math.max(a, b),
      0
    );
  }

  addLayer(): { id: string; zIndex: number } {
    const id = crypto.randomUUID();
    const zIndex = this.maxZIndex + 20;
    this.layerIdToZIndex.set(id, zIndex);

    return { id, zIndex };
  }

  removeLayer(id: string): void {
    this.layerIdToZIndex.delete(id);
  }
}

export default new LayerControl();
