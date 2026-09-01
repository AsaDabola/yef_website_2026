"use client";

import { useEffect, useRef, useState } from "react";
import "./NetworkGlobe.css";
import * as d3 from "d3";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import { GLOBE_COUNTRIES, GLOBE_CHAPTERS, type GlobeCountry } from "@/lib/network/globeData";

/**
 * The Network hero's globe: a real D3 orthographic projection of the actual
 * world (an alpha-3-keyed TopoJSON atlas), with every YEF chapter country
 * plotted at its real coordinates, a region filter, and a click-through
 * profile panel — population/capital/language plus, where `@/lib/chapters`
 * names more than the country marker itself, the real local chapters there.
 *
 * Every route arcs out from Orlando headquarters, matching the rest of the
 * network page's "one hub" story.
 */

const HQ = { name: "Orlando HQ", lat: 28.6, lon: -81.2 };
const WORLD_TOPOLOGY_URL = "/data/world-countries-110m.json";

type CountryFeatureProps = { id: string; name: string; name_long: string };

export default function NetworkGlobe({ className = "" }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<GlobeCountry | null>(null);
  const [status, setStatus] = useState("SELECT A COUNTRY TO EXPLORE");
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  const regions = [...new Set(GLOBE_COUNTRIES.map((c) => c.region))];
  const selectRegionRef = useRef<(name: string) => void>(() => {});
  const clearSelectionRef = useRef<() => void>(() => {});

  useEffect(() => {
    const svgEl = svgRef.current;
    const stage = stageRef.current;
    if (!svgEl || !stage) return;

    const reducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const svg = d3.select(svgEl);
    svg.selectAll("*").remove();

    const sphere = { type: "Sphere" as const };
    const graticule = d3.geoGraticule10();
    const projection = d3
      .geoOrthographic()
      .clipAngle(90)
      .precision(0.6)
      .rotate([-HQ.lon, -HQ.lat, 0]);
    const path = d3.geoPath(projection);

    const spherePath = svg.append("path").attr("class", "yef-sphere");
    const graticulePath = svg.append("path").attr("class", "yef-graticule");
    const countryLayer = svg.append("g");
    const arcLayer = svg.append("g");
    const nodeLayer = svg.append("g");
    const hqLayer = svg.append("g");

    const countryByAlpha3 = new Map(GLOBE_COUNTRIES.map((c) => [c.alpha3, c]));

    const hqCoord: [number, number] = [HQ.lon, HQ.lat];
    const arcs = GLOBE_COUNTRIES.map((c) => ({
      country: c,
      geometry: {
        type: "LineString" as const,
        coordinates: [hqCoord, [c.lon, c.lat] as [number, number]],
      },
    }));

    let countryPaths: d3.Selection<SVGPathElement, CountryFeatureFeature, SVGGElement, unknown> | null =
      null;
    let arcPaths: d3.Selection<SVGPathElement, (typeof arcs)[number], SVGGElement, unknown> | null = null;

    type CountryFeatureFeature = GeoJSON.Feature<GeoJSON.Geometry, CountryFeatureProps>;

    const nodeGroups = nodeLayer
      .selectAll<SVGGElement, GlobeCountry>("g")
      .data(GLOBE_COUNTRIES)
      .join("g")
      .attr("role", "button")
      .attr("aria-label", (d) => `Open ${d.name} profile`)
      .style("cursor", "pointer")
      .on("click", (_event, d) => selectCountryRef.current(d));

    nodeGroups.append("circle").attr("class", "yef-chapter-ring").attr("r", 8);
    nodeGroups.append("circle").attr("class", "yef-chapter-node").attr("r", 4.2);

    hqLayer.append("circle").attr("class", "yef-hq-ring").attr("r", 11);
    const hqNode = hqLayer.append("circle").attr("class", "yef-hq-node").attr("r", 6);

    function isVisible(coordinates: [number, number]) {
      const center: [number, number] = [-projection.rotate()[0], -projection.rotate()[1]];
      return d3.geoDistance(coordinates, center) < Math.PI / 2;
    }

    function draw() {
      spherePath.attr("d", path(sphere));
      graticulePath.attr("d", path(graticule) ?? "");
      countryPaths
        ?.attr("d", path)
        .classed("is-selected", (d) => countryByAlpha3.get(d.properties.id)?.code === selectedRef.current?.code);
      arcPaths
        ?.attr("d", (d) => path(d.geometry) ?? "")
        .style("display", (d) => (isVisible(hqCoord) || isVisible([d.country.lon, d.country.lat]) ? null : "none"))
        .style("opacity", (d) => {
          const sel = selectedRef.current;
          const region = activeRegionRef.current;
          if (sel) return sel.code === d.country.code ? 0.95 : 0.06;
          if (region) return d.country.region === region ? 0.8 : 0.06;
          return 0.3;
        });
      nodeGroups
        .attr("transform", (d) => {
          const point = projection([d.lon, d.lat]);
          return point ? `translate(${point[0]},${point[1]})` : "translate(-100,-100)";
        })
        .style("display", (d) => (isVisible([d.lon, d.lat]) ? null : "none"))
        .style("opacity", (d) => {
          const region = activeRegionRef.current;
          return !region || d.region === region ? 1 : 0.22;
        });
      nodeGroups.select(".yef-chapter-node").classed("is-active", (d) => d.code === selectedRef.current?.code);
      const hqPoint = projection(hqCoord);
      hqLayer
        .attr("transform", hqPoint ? `translate(${hqPoint[0]},${hqPoint[1]})` : "translate(-100,-100)")
        .style("display", isVisible(hqCoord) ? "" : "none");
      hqNode.classed("is-active", selectedRef.current === null);
    }

    function resize() {
      const width = Math.max(300, stage!.getBoundingClientRect().width);
      svg.attr("viewBox", `0 0 ${width} ${width}`);
      projection.translate([width / 2, width / 2]).scale(width * 0.42);
      draw();
    }

    let autoRotate = !reducedMotion;
    let targetRotation: [number, number, number] | null = null;
    let lastTime = performance.now();
    let raf = 0;

    const selectedRef = { current: null as GlobeCountry | null };
    const activeRegionRef = { current: null as string | null };

    function selectCountry(country: GlobeCountry) {
      selectedRef.current = country;
      activeRegionRef.current = country.region;
      setSelected(country);
      setActiveRegion(country.region);
      setStatus(country.name.toUpperCase());
      targetRotation = [-country.lon, -country.lat, 0];
      projection.scale(Math.max(projection.scale(), stage!.getBoundingClientRect().width * 0.62));
      autoRotate = false;
      draw();
    }
    const selectCountryRef = { current: selectCountry };
    selectCountryRef.current = selectCountry;

    function selectRegionByName(regionName: string) {
      selectedRef.current = null;
      activeRegionRef.current = regionName;
      setSelected(null);
      setActiveRegion(regionName);
      setStatus(`${regionName.toUpperCase()} NETWORK — SELECT A COUNTRY`);
      const inRegion = GLOBE_COUNTRIES.filter((c) => c.region === regionName);
      const avgLon = d3.mean(inRegion, (c) => c.lon) ?? 0;
      const avgLat = d3.mean(inRegion, (c) => c.lat) ?? 0;
      targetRotation = [-avgLon, -avgLat, 0];
      projection.scale(stage!.getBoundingClientRect().width * 0.42);
      autoRotate = false;
      draw();
    }
    selectRegionRef.current = selectRegionByName;

    function clearSelection() {
      selectedRef.current = null;
      activeRegionRef.current = null;
      setSelected(null);
      setActiveRegion(null);
      setStatus("SELECT A COUNTRY TO EXPLORE");
      projection.scale(stage!.getBoundingClientRect().width * 0.42);
      if (!reducedMotion) autoRotate = true;
      draw();
    }
    clearSelectionRef.current = clearSelection;

    const controller = new AbortController();
    fetch(WORLD_TOPOLOGY_URL, { signal: controller.signal })
      .then((res) => res.json())
      .then((topology: Topology) => {
        const collection = feature(
          topology,
          topology.objects.features as GeometryCollection,
        ) as unknown as { features: CountryFeatureFeature[] };

        countryPaths = countryLayer
          .selectAll<SVGPathElement, CountryFeatureFeature>("path")
          .data(collection.features)
          .join("path")
          .attr("class", (d) =>
            countryByAlpha3.has(d.properties.id) ? "yef-country yef-country-network" : "yef-country",
          )
          .attr("role", (d) => (countryByAlpha3.has(d.properties.id) ? "button" : null))
          .attr("aria-label", (d) => {
            const c = countryByAlpha3.get(d.properties.id);
            return c ? `Open ${c.name} profile` : null;
          })
          .on("click", (_event, d) => {
            const c = countryByAlpha3.get(d.properties.id);
            if (c) selectCountryRef.current(c);
          });

        arcPaths = arcLayer
          .selectAll<SVGPathElement, (typeof arcs)[number]>("path")
          .data(arcs)
          .join("path")
          .attr("class", "yef-network-arc");

        resize();
      })
      .catch(() => {
        // Markers and arcs still carry the globe if the country outlines never land.
        resize();
      });

    const observer = new ResizeObserver(resize);
    observer.observe(stage);
    resize();

    function animate(now: number) {
      const dt = Math.min(40, now - lastTime);
      lastTime = now;
      if (targetRotation) {
        const rotation = projection.rotate();
        const next = rotation.map((v, i) => v + (targetRotation![i] - v) * 0.08) as [
          number,
          number,
          number,
        ];
        projection.rotate(next);
        if (Math.abs(next[0] - targetRotation[0]) < 0.15 && Math.abs(next[1] - targetRotation[1]) < 0.15) {
          projection.rotate(targetRotation);
          targetRotation = null;
        }
        draw();
      } else if (autoRotate) {
        const rotation = projection.rotate();
        projection.rotate([rotation[0] + dt * 0.004, rotation[1], 0]);
        draw();
      }
      raf = requestAnimationFrame(animate);
    }
    raf = requestAnimationFrame(animate);

    const dragBehavior = d3
      .drag<SVGSVGElement, unknown>()
      .on("start", () => {
        autoRotate = false;
        targetRotation = null;
      })
      .on("drag", (event) => {
        const rotation = projection.rotate();
        projection.rotate([rotation[0] + event.dx * 0.28, rotation[1] - event.dy * 0.28, 0]);
        draw();
      })
      .on("end", () => {
        if (!reducedMotion && !selectedRef.current) autoRotate = true;
      });
    svg.call(dragBehavior);

    const onPointerEnter = () => {
      autoRotate = false;
    };
    const onPointerLeave = () => {
      if (!reducedMotion && !selectedRef.current && !targetRotation) autoRotate = true;
    };
    stage.addEventListener("pointerenter", onPointerEnter);
    stage.addEventListener("pointerleave", onPointerLeave);

    return () => {
      cancelAnimationFrame(raf);
      controller.abort();
      observer.disconnect();
      stage.removeEventListener("pointerenter", onPointerEnter);
      stage.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  const localChapters = selected ? GLOBE_CHAPTERS[selected.code] : undefined;

  return (
    <div className={`yef-globe-column ${className}`}>
      <div className="yef-map-header">
        <div className="yef-network-count">
          <strong>GLOBAL NETWORK</strong>
          <span>&bull;</span>
          {GLOBE_COUNTRIES.length} COUNTRIES
        </div>
        <div className="yef-map-legend" aria-label="Map symbols">
          <span>
            <i className="yef-legend-country" aria-hidden="true" />
            Country network
          </span>
          <span>
            <i className="yef-legend-hq" aria-hidden="true" />
            Orlando HQ
          </span>
        </div>
      </div>

      <div className="yef-globe-stage" ref={stageRef} aria-label="Rotating globe showing YEF chapter countries">
        <svg
          ref={svgRef}
          role="img"
          aria-labelledby="yef-globe-title yef-globe-desc"
        >
          <title id="yef-globe-title">YEF global chapter network</title>
          <desc id="yef-globe-desc">
            A slowly rotating globe shows YEF chapter countries connected to Orlando headquarters.
          </desc>
        </svg>

        {selected && (
          <aside className="yef-country-panel" aria-live="polite">
            <button
              type="button"
              className="yef-country-close"
              aria-label="Close country profile"
              onClick={() => clearSelectionRef.current()}
            >
              &times;
            </button>
            <p className="yef-country-kicker">COUNTRY PROFILE</p>
            <h2>{selected.name}</h2>
            <dl>
              <div>
                <dt>Population</dt>
                <dd>{selected.population}</dd>
              </div>
              <div>
                <dt>Capital</dt>
                <dd>{selected.capital}</dd>
              </div>
              <div>
                <dt>Language</dt>
                <dd>{selected.language}</dd>
              </div>
              <div>
                <dt>YEF Region</dt>
                <dd>{selected.region}</dd>
              </div>
            </dl>

            {localChapters ? (
              <div className="yef-chapter-list">
                {localChapters.map((c) => (
                  <div className="yef-chapter-card" key={c.name}>
                    <div className="yef-chapter-card-name">{c.name}</div>
                    <div className="yef-chapter-card-city">{c.city}</div>
                    <div className="yef-chapter-card-leader">
                      <span>{c.leader}</span>
                      <span className="yef-chapter-card-role">{c.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="yef-country-summary">
                YEF has a presence in {selected.name} — detailed chapter contacts aren&apos;t listed yet.
              </p>
            )}

            <a className="yef-country-link" href={`/${selected.code}`}>
              VISIT COUNTRY SITE <span aria-hidden="true">&rarr;</span>
            </a>
          </aside>
        )}
      </div>

      <div className="yef-globe-status" aria-live="polite">
        <span className="yef-status-dot" aria-hidden="true" />
        <span>{status}</span>
      </div>

      <div className="yef-chapter-selector" aria-label="Show network region">
        {regions.map((region) => (
          <button
            key={region}
            type="button"
            aria-pressed={activeRegion === region}
            onClick={() => selectRegionRef.current(region)}
          >
            {region}
          </button>
        ))}
      </div>
    </div>
  );
}
