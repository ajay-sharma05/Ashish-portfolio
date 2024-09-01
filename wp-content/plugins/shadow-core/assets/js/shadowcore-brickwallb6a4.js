/** 
 * Author: Shadow Themes
 * Author URL: http://shadow-themes.com
 * Version: 1.21.06.16
 */
"use strict";

/* BrickWall Plugin by Shadow-Themes */
/* --------------------------------- */
class ShadowCore_BrickWall {
	constructor ( $el, options = false ) {
		let this_class = this;
		if ($el instanceof jQuery) {
			this.$el = $el;
			this.layoutDelay = 0;
			this.oldWidth = 0;
			this.elemCount = this.$el.children().length;
			this.isActive = false;
			
			// Default Options
			this.options = {
				animSpeed : 'fast', // 'fast', 'slow', 'none'
				type : 'masonry', // 'grid', 'masonry', 'adjusted'
				stagger : 0, // integer value (ex: 30) in milliseconds added to each item 'transition-delay' index * value
			}
			
			// Apply Options
			if ( options &&  typeof options == 'object') {
				for ( const [key, value] of Object.entries( options ) ) {
					this_class.options[key] = value;
				}
			}
			
			if ( 'grid' == this.options.type || 'adjusted' == this.options.type ) {
				this.grid = {
					cH: 0,
					rH: [],
					rI: []
				}
			} else {
				this.grid = false;
			}
			
			// Set Speed
			if ( 'fast' !== this.options.animSpeed ) {
				this.$el.addClass( 'animation--' + this.options.animSpeed );
			}

			// Init BrickWall
			if (this.elemCount) {
				this.isActive = true;
				this.$el.addClass('brickwall-grid');
				if ( this.options.stagger ) {
					this.$el.children().each(function() {
						jQuery(this).css('transition-delay', this_class.options.stagger * jQuery(this).index() + 'ms' );
					});
				}
				this.layout();
			} else {
				console.warn('BrickWall: No children items found');
			}
			
			// Events
			jQuery(window).on('resize', function() {
				clearTimeout(this_class.resizeTimer);
				this_class.resizeTimer = setTimeout(function() {
					if (this_class.oldWidth !== this_class.$el.width()) {
						this_class.layout();
					}
				}, 150, this_class);
			});
			
			// Fitler
			if ( this.$el.parent().children('.shadowcore-brickwall-filter').length ) {
				this.$filter = this.$el.parent().children('.shadowcore-brickwall-filter');
				this.$filter.on('click', 'a', function(e) {
					e.preventDefault();
					let href = jQuery(this).attr('href');
					this_class.$filter.children('.is-active').removeClass('is-active');
					jQuery(this).addClass('is-active');
					this_class.filter( href.substring( 1, href.length ) );
				});
			}
		} else {
			console.error('BrickWall Error: Element is not a jQuery Object.');
		}
	}

	getPaddings( $item ) {
		return Array( $item.css('paddingTop'), $item.css('paddingRight'), $item.css('paddingBottom'), $item.css('paddingLeft') );
	}
	
	moveItem( $item ) {	
		$item.css({
			'transform' : 'scale('+ ($item.hasClass('brickwall-item') ? 1 : 0) +') translate3d(' + $item.setX + 'px, '+ $item.setY +'px, 0)',
			'transform-origin' : $item.oX + 'px ' + $item.oY + 'px',
			'z-index' : 3
		});
	}
	
	initItem( $item ) {
		setTimeout(function() {
			$item.addClass('brickwall-item');
			$item.css({
				'transform' : 'scale(1) translate3d(' + parseFloat($item.setX).toFixed(2) + 'px, '+ parseFloat($item.setY).toFixed(2) +'px, 0)'
			});
		}, 30, $item);
	}
	
	calcItem( $item, params = false) {
		if ( ! ($item instanceof jQuery) ) {
			$item = jQuery($item);
		}
		
		// Get Item Paddings
		let itemPaddings = this.getPaddings( $item );
		
		let colsX = this.colsX,
			colsY = this.colsY,
			setX = 0,
			setY = 0,
			iW = $item.width() + parseInt(itemPaddings[1], 10) + parseInt(itemPaddings[3], 10),
			iH = $item.height() + parseInt(itemPaddings[0], 10) + parseInt(itemPaddings[2], 10);

		if ( 'grid' == this.options.type || 'adjusted' == this.options.type ) {
			// Grid or Adjusted Item
			if ( params ) {
				let cols = this.options.cols,
					posX = params.id - ( params.cY * cols ); // Position in Row
				
				// Erase Vars
				if ( params.cY === 0) {
					this.grid.cH = 0;
				}
				if ( posX === 0 ) {
					this.grid.rH.fill(0);
					this.grid.rI.fill(0);
				}
				
				// Calculate Position
				setX = iW * posX;
				setY = this.grid.cH;
				this.grid.rH[posX] = iH;
				
				$item.setX = setX;
				$item.setY = setY;
				$item.oX = parseFloat(setX + 0.5 * iW).toFixed(2);
				$item.oY = parseFloat(setY + 0.5 * iH).toFixed(2);
				
				if ( 'adjusted' == this.options.type ) {
					$item.iH = iH;
					this.grid.rI[posX] = $item;
				} else {
					// Grid: Move Item
					this.moveItem( $item );
					
					// Grid: Init Item
					if ( ! $item.hasClass('brickwall-item') ) {
						this.initItem( $item );
					}
				}
				
				// End of Row
				if ( posX == (cols - 1) || params.id == ( this.elemCount - 1 ) ) {
					// Row Ends
					let this_rH = this.grid.rH[this.grid.rH.indexOf( Math.max.apply( Math, this.grid.rH ) )]
					this.grid.cH = this.grid.cH + this_rH;
					
					if ( 'adjusted' == this.options.type ) {
						this.grid.rI.forEach(($item_el) => {
							if ( $item_el ) {
								if ( $item_el.iH < this_rH ) {
									let diff = 0.5 * ( this_rH - $item_el.iH );
									$item_el.setY = $item_el.setY + diff;
									$item_el.oY = parseFloat($item_el.setY + 0.5 * $item_el.iH).toFixed(2);
								}

								// Move Item
								this.moveItem( $item_el );

								// Init Item
								if ( ! $item_el.hasClass('brickwall-item') ) {
									this.initItem( $item_el );
								}
							}
						});
					}
				}
			}
		} else {
			// Masonry Item
			if ( ! params ) {
				params = {
					fr: 0,
					id: 0
				}
			}
			if ( params.fr && params.id ) {
				if ( params.id ) {
					setX = iW * params.id;
				}
				colsY[params.id] = iH;
				colsX[params.id] = setX;
			} else {
				let cc = colsY.indexOf( Math.min.apply( Math, colsY ) );
					setX = colsX[cc];
					setY = colsY[cc];
				colsY[cc] = colsY[cc] + iH;
			}
			
			$item.setX = setX;
			$item.setY = setY;
			$item.oX = parseFloat(setX + 0.5 * iW).toFixed(2);
			$item.oY = parseFloat(setY + 0.5 * iH).toFixed(2);
			
			// Move Item
			this.moveItem( $item );
			
			// Init Item
			if ( ! $item.hasClass('brickwall-item') ) {
				this.initItem( $item );
			}

			// Update Grid Values
			this.colsX = colsX;
			this.colsY = colsY;		
		}
	}

	layout( selector = ':not(.is-hidden)', callback = false ) {
		let this_class = this,
			ind = 0,
			prevY = 1,
			iP = this.getPaddings( this.$el.children() ),
			cW = this.$el.children().width() + parseInt(iP[1], 10) + parseInt(iP[3], 10),
			cols = Math.round( 1 / ( cW / this.$el.width() ) ),
			colsX, colsY;
		
		this.elemCount = this.$el.children(selector).length;
		
		this.options.cols = cols;
		if ( ! isNaN(cols) ) {
			if ( selector && ':not(.is-hidden)' !== selector ) {
				ind = this.$el.children().length - 1;
				colsX = this.colsX;
				colsY = this.colsY;
			} else {
				selector = ':not(.is-hidden)';
				colsX = new Array(cols);
				colsY = new Array(cols);
				colsX.fill(0);
				colsY.fill(0);
				this.colsX = colsX;
				this.colsY = colsY;
			}

			if ( ! this.hasOwnProperty('colsX') ) {
				colsX.fill(0);
				this.colsX = colsX;
			}
			if ( ! this.hasOwnProperty('colsY') ) {
				colsY.fill(0);
				this.colsY = colsY;
			}
			
			this.$el.children(selector).each(function() {
				let $this = jQuery(this),
					posY = Math.floor((ind)/cols) + 1;
				
				if ( 'grid' == this_class.options.type || 'adjusted' == this_class.options.type ) {
					// Grid and Adjusted Layout
					this_class.calcItem( this, {cY: posY-1, id: ind} ); // $item, fr, ind, ins
				} else {
					// Masonry Layout
					if (posY == 1) {
						// First Row
						this_class.calcItem( this, {fr: 1, id: ind} ); // $item, fr, ind, ins
					} else {
						// Other Rows
						this_class.calcItem( this ); // $item, fr, ind, ins
					}
				}
				prevY = posY;
				ind++;
			});

			if ( 'grid' == this_class.options.type || 'adjusted' == this_class.options.type ) {
				// Grid and Adjusted Layout
				this.$el.height( this.grid.cH );
			} else {
				this.$el.height( Math.max.apply( Math, colsY ) );
			}
			
			this.oldWidth = this.$el.width();

			this.colsY = colsY;
			this.colsX = colsX;

			if ( callback && typeof callback === 'function' ) {
				callback( this_class );
			}
		} else {
			this.destroy();
		}
	}

	insert( $items, callback = false ) {
		let this_class = this;

		if ( ! ($items instanceof jQuery) ) {
			$items = jQuery($items);
		}
		
		// Update Elems Count
		let ind = this.elemCount;
		this.elemCount = this.elemCount + $items.length;
		
		this_class.$el.append($items);
		this_class.layout();
		
		// Update Container Height
		if ( 'grid' == this_class.options.type || 'adjusted' == this_class.options.type ) {
			// Grid and Adjusted Layout
			this.$el.height( this.grid.cH );
		} else {
			this.$el.height( Math.max.apply( Math, this_class.colsY ) );
		}
		
		// Callback
		if ( callback && typeof callback === 'function' ) {
			callback( this_class );
		}
	}

	filter( selector ) {
		let this_class = this;
		if ( 'all' == selector ) {
			this.$el.children('.is-hidden').removeClass('is-hidden');
		} else {
			this.$el.children('.brickwall-filter--' + selector).removeClass('is-hidden');
			this.$el.children(':not(.brickwall-filter--' + selector + ')').addClass('is-hidden');
		}

		if (this.$el.children('.is-hidden').length) {
			this.$el.children('.is-hidden').each(function() {
				let $this = jQuery(this),
					posMatrix = $this.css('transform').split(','),
					posX = parseFloat(posMatrix[4]),
					posY = parseFloat(posMatrix[5].substring( 0, posMatrix[5].length - 1 )),
					itemPaddings = this_class.getPaddings( $this ),
					iW = $this.width() + parseInt(itemPaddings[1], 10) + parseInt(itemPaddings[3], 10),
					iH = $this.height() + parseInt(itemPaddings[0], 10) + parseInt(itemPaddings[2], 10);
				$this.css({
					'transform' : 'scale(0) translate3d(' + parseFloat(posX).toFixed(2) + 'px, '+ parseFloat(posY).toFixed(2) +'px, 0)',
					'transform-origin' : parseFloat(posX + 0.5 * iW ).toFixed(2) + 'px ' + parseFloat( posY + 0.5 * iH ).toFixed(2) + 'px',
					'z-index' : '1'
				});
			});
		}

		this.layout();
	}

	remove( $item ) {
		if ( ! ($item instanceof jQuery) ) {
			$item = jQuery($item);
		}
		let itemPaddings = this.getPaddings( $item ),
			iW = $item.width() + parseInt(itemPaddings[1], 10) + parseInt(itemPaddings[3], 10),
			iH = $item.height() + parseInt(itemPaddings[0], 10) + parseInt(itemPaddings[2], 10);
		
		$item.addClass('is-hidden');
		let posMatrix = $item.css('transform').split(','),
			posX = parseFloat(posMatrix[4]),
			posY = parseFloat(posMatrix[5].substring( 0, posMatrix[5].length - 1 ));

		$item.css({
			'transform' : 'scale(0) translate3d(' + parseFloat(posX).toFixed(2) + 'px, '+ parseFloat(posY).toFixed(2) +'px, 0)',
			'transform-origin' : parseFloat(posX + 0.5 * iW ).toFixed(2) + 'px ' + parseFloat( posY + 0.5 * iH ).toFixed(2) + 'px',
			'z-index' : '1'
		});

		this.layout();

		setTimeout(function(){
			$item.remove();
		}, (this.options.animSpeed == 'slow' ? 850 : 450) , $item);
	}

	destroy() {
		this.$el.removeClass('brickwall-grid');
		this.$el.attr('style', null);
		this.$el.children().each(function() {
			let $this = jQuery(this);
			$this.attr('style', null).removeClass('is-hidden', 'brickwall-item');
		});
		delete(this);
	}
}

/* Elementor Part */
/* -------------- */
jQuery(window).on('elementor/frontend/init', function () {
	/*  ----------------
        Frontend Scripts
        ----------------  */
	/* Masonry Gallery */
    elementorFrontend.hooks.addAction('frontend/element_ready/shadow-gallery-masonry.default', function ($scope) {
		let $this = $scope.find('.shadowcore-is-masonry'),
			this_id = $this.attr('data-id');
		shadowcore_el.elements.masonry[ this_id ] = new ShadowCore_BrickWall( jQuery('.shadowcore-is-masonry[data-id="'+this_id+'"]') );
	});
	
	/* Testimonials Grid */
    elementorFrontend.hooks.addAction('frontend/element_ready/shadow-testimonials-grid.default', function ($scope) {
		let this_id = $scope.attr('data-id');
		shadowcore_el.elements.masonry[ this_id ] = new ShadowCore_BrickWall( jQuery('.shadowcore-is-masonry[data-id="'+this_id+'"]') );
    });
	
	/* Query Posts Grid */
    elementorFrontend.hooks.addAction('frontend/element_ready/shadow-query-grid.default', function ($scope) {
		let this_id = $scope.attr('data-id'),
			$wrap = $scope.find('.shadowcore-posts-grid');
		
		shadowcore_el.elements.masonry[ this_id ] = new ShadowCore_BrickWall( $wrap, {
			type: $wrap.attr('data-type')
		});
    });
	
    /* 	------
		Editor
		------ */
    if (elementorFrontend.isEditMode()) {
		/* Query Posts Grid */
		elementor.hooks.addAction( 'panel/open_editor/widget/shadow-query-grid', function( panel, model, view ) {
			if ( ! panel.$el.hasClass('is-init') ) {
				panel.$el.addClass('is-init');
				if ( shadowcore_el.elements.masonry.hasOwnProperty(model.id) ) {
					shadowcore_el.elements.masonry[ model.id ].layout();
				}
				panel.$el.on('click', function() {
					if ( shadowcore_el.elements.masonry.hasOwnProperty(model.id) ) {
						shadowcore_el.elements.masonry[ model.id ].layout();
					}
				});
				panel.$el.on('change', 'input, select', function() {
					if ( shadowcore_el.elements.masonry.hasOwnProperty(model.id) ) {
						shadowcore_el.elements.masonry[ model.id ].layout();
					}
				});
			}
		});
		
		/* Gallery Masonry */
        elementor.hooks.addAction( 'panel/open_editor/widget/shadow-gallery-masonry', function( panel, model, view ) {
            let this_id = view.$el.data('id');

            panel.$el.on('mouseup', '.elementor-control-item_spacing', function() {
                shadowcore_el.elements.masonry[ this_id ].layout();
            }).on('mouseleave', '.elementor-control-item_spacing', function() {
                shadowcore_el.elements.masonry[ this_id ].layout();
            }).on('mousemove', '.elementor-control-item_spacing', function() {
                if (jQuery(this).find('.noUi-handle').hasClass('noUi-active')) {
                    shadowcore_el.elements.masonry[ this_id ].layout();
                }
            });
            panel.$el.on('change', '.elementor-control-item_spacing input', function() {
                shadowcore_el.elements.masonry[ this_id ].layout();
            });

            panel.$el.on('mouseup', '.elementor-control-caption_spacing--under', function() {
                shadowcore_el.elements.masonry[ this_id ].layout();
            }).on('mouseleave', '.elementor-control-caption_spacing--under', function() {
                shadowcore_el.elements.masonry[ this_id ].layout();
            }).on('mousemove', '.elementor-control-caption_spacing--under', function() {
                if (jQuery(this).find('.noUi-handle').hasClass('noUi-active')) {
                    shadowcore_el.elements.masonry[ this_id ].layout();
                }
            });
            panel.$el.on('change', '.elementor-control-caption_spacing--under input', function() {
                shadowcore_el.elements.masonry[ this_id ].layout();
            });

            panel.$el.on('change', '.elementor-control-grid_columns select', function() {
                shadowcore_el.elements.masonry[ this_id ].layout();
            });
            panel.$el.on('change', '.elementor-control-captions select', function() {
                shadowcore_el.elements.masonry[ this_id ].layout();
            });
        });

        /* Testimonials Grid */
        elementor.hooks.addAction( 'panel/open_editor/widget/shadow-testimonials-grid', function( panel, model, view ) {
            let this_id = view.$el.data('id');
            panel.$el.on('mouseup', '.elementor-control-item_spacing', function() {
                shadowcore_el.elements.masonry[ this_id ].layout();
            }).on('mouseleave', '.elementor-control-item_spacing', function() {
                shadowcore_el.elements.masonry[ this_id ].layout();
            }).on('mousemove', '.elementor-control-item_spacing', function() {
                shadowcore_el.elements.masonry[ this_id ].layout();
            });
            
            panel.$el.on('mouseup', '.elementor-control-image_size', function() {
                shadowcore_el.elements.masonry[ this_id ].layout();
            }).on('mouseleave', '.elementor-control-image_size', function() {
                shadowcore_el.elements.masonry[ this_id ].layout();
            }).on('mousemove', '.elementor-control-image_size', function() {
                if (jQuery(this).find('.noUi-handle').hasClass('noUi-active')) {
                    shadowcore_el.elements.masonry[ this_id ].layout();
                }
            });
            panel.$el.on('change', '.elementor-control-image_size input', function() {
                shadowcore_el.elements.masonry[ this_id ].layout();
            });

            panel.$el.on('mouseup', '.elementor-control-oc_spacing', function() {
                shadowcore_el.elements.masonry[ this_id ].layout();
            }).on('mouseleave', '.elementor-control-oc_spacing', function() {
                shadowcore_el.elements.masonry[ this_id ].layout();
            }).on('mousemove', '.elementor-control-oc_spacing', function() {
                if (jQuery(this).find('.noUi-handle').hasClass('noUi-active')) {
                    shadowcore_el.elements.masonry[ this_id ].layout();
                }
            });
            panel.$el.on('change', '.elementor-control-oc_spacing', function() {
                shadowcore_el.elements.masonry[ this_id ].layout();
            });
            
            panel.$el.on('mouseup', '.elementor-control-rating_spacing', function() {
                shadowcore_el.elements.masonry[ this_id ].layout();
            }).on('mouseleave', '.elementor-control-rating_spacing', function() {
                shadowcore_el.elements.masonry[ this_id ].layout();
            }).on('mousemove', '.elementor-control-rating_spacing', function() {
                if (jQuery(this).find('.noUi-handle').hasClass('noUi-active')) {
                    shadowcore_el.elements.masonry[ this_id ].layout();
                }
            });
            panel.$el.on('change', '.elementor-control-rating_spacing', function() {
                shadowcore_el.elements.masonry[ this_id ].layout();
            });
            
            panel.$el.on('click', '.elementor-control-head_layout .elementor-choices', function() {
                shadowcore_el.elements.masonry[ this_id ].layout();
            });
            panel.$el.on('click', '.elementor-control-card_swap .elementor-switch', function() {
                shadowcore_el.elements.masonry[ this_id ].layout();
            });
            panel.$el.on('change', '.elementor-control-heading_spacing input', function() {
                shadowcore_el.elements.masonry[ this_id ].layout();
            });
            panel.$el.on('change', '.elementor-control-content_margin input', function() {
                shadowcore_el.elements.masonry[ this_id ].layout();
            });
            panel.$el.on('change', '.elementor-control-content_padding input', function() {
                shadowcore_el.elements.masonry[ this_id ].layout();
            });
			
            panel.$el.on('change', '.elementor-control-grid_columns select', function() {
                shadowcore_el.elements.masonry[ this_id ].layout();
            });
			panel.$el.on('change', '.elementor-control-grid_columns_tablet select', function() {
                shadowcore_el.elements.masonry[ this_id ].layout();
            });
			panel.$el.on('change', '.elementor-control-grid_columns_mobile select', function() {
                shadowcore_el.elements.masonry[ this_id ].layout();
            });
        });
	}
});