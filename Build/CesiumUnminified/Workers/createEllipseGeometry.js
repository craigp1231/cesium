/**
 * Cesium - https://github.com/CesiumGS/cesium
 *
 * Copyright 2011-2020 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/CesiumGS/cesium/blob/main/LICENSE.md for full licensing details.
 */

define(['./Matrix2-b06ef836', './when-229515d6', './EllipseGeometry-458852d2', './RuntimeError-ffe03243', './ComponentDatatype-dc3af6a4', './WebGLConstants-4e26b85a', './GeometryOffsetAttribute-036749bc', './Transforms-e254a706', './combine-8ce3f24b', './EllipseGeometryLibrary-47c965ca', './GeometryAttribute-b662d87a', './GeometryAttributes-b253752a', './GeometryInstance-859d322e', './GeometryPipeline-78f66d53', './AttributeCompression-0d03c199', './EncodedCartesian3-1c4d2319', './IndexDatatype-87b580b0', './IntersectionTests-8df35d37', './Plane-5d90414b', './VertexFormat-64c5c4fb'], (function (Matrix2, when, EllipseGeometry, RuntimeError, ComponentDatatype, WebGLConstants, GeometryOffsetAttribute, Transforms, combine, EllipseGeometryLibrary, GeometryAttribute, GeometryAttributes, GeometryInstance, GeometryPipeline, AttributeCompression, EncodedCartesian3, IndexDatatype, IntersectionTests, Plane, VertexFormat) { 'use strict';

  function createEllipseGeometry(ellipseGeometry, offset) {
    if (when.defined(offset)) {
      ellipseGeometry = EllipseGeometry.EllipseGeometry.unpack(ellipseGeometry, offset);
    }
    ellipseGeometry._center = Matrix2.Cartesian3.clone(ellipseGeometry._center);
    ellipseGeometry._ellipsoid = Matrix2.Ellipsoid.clone(ellipseGeometry._ellipsoid);
    return EllipseGeometry.EllipseGeometry.createGeometry(ellipseGeometry);
  }

  return createEllipseGeometry;

}));
//# sourceMappingURL=createEllipseGeometry.js.map
